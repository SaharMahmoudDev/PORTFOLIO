import "server-only";
import dns from "node:dns/promises";
import net from "node:net";

const TIMEOUT_MS = 8_000;
const MAX_BYTES = 500_000;
const MAX_REDIRECTS = 4;
const USER_AGENT = "Mozilla/5.0 (compatible; SaharPortfolioBot/1.0)";

export type FetchedPage = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  textExcerpt: string;
};

function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    const [a, b] = parts;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower === "::1" || lower === "::") return true;
    if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
    if (lower.startsWith("fe80")) return true;
    if (lower.startsWith("::ffff:")) {
      const v4 = lower.slice(7);
      return net.isIPv4(v4) ? isPrivateIp(v4) : false;
    }
    return false;
  }
  return true; // unrecognized -> treat as unsafe
}

async function assertPublicHost(hostname: string): Promise<boolean> {
  if (hostname.toLowerCase() === "localhost") return false;
  try {
    const results = await dns.lookup(hostname, { all: true });
    if (results.length === 0) return false;
    return results.every((r) => !isPrivateIp(r.address));
  } catch {
    return false;
  }
}

function extractMetaTags(html: string): Record<string, string> {
  const metas: Record<string, string> = {};
  const tagRe = /<meta\b[^>]*>/gi;
  const attrRe = /([\w:-]+)\s*=\s*"([^"]*)"|([\w:-]+)\s*=\s*'([^']*)'/g;

  for (const tagMatch of html.matchAll(tagRe)) {
    const attrs: Record<string, string> = {};
    for (const attrMatch of tagMatch[0].matchAll(attrRe)) {
      const key = (attrMatch[1] ?? attrMatch[3])?.toLowerCase();
      const value = attrMatch[2] ?? attrMatch[4] ?? "";
      if (key) attrs[key] = value;
    }
    const key = (attrs.property ?? attrs.name)?.toLowerCase();
    if (key && attrs.content !== undefined) metas[key] = attrs.content;
  }

  return metas;
}

function parseHtml(html: string): FetchedPage {
  const titleMatch = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  const metas = extractMetaTags(html);

  const textExcerpt = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3000);

  return {
    title: (titleMatch?.[1] ?? "").trim(),
    description: metas.description ?? "",
    ogTitle: metas["og:title"] ?? "",
    ogDescription: metas["og:description"] ?? "",
    ogImage: metas["og:image"] ?? "",
    textExcerpt,
  };
}

// Fetches a page for the AI Project Generator with basic SSRF protections:
// only http(s), DNS-resolves the host (and every redirect hop, manually
// followed) and rejects anything resolving to a private/loopback/link-local
// address, short timeout, capped response size, HTML only.
export async function fetchPageSafely(
  rawUrl: string,
): Promise<FetchedPage | null> {
  let current: URL;
  try {
    current = new URL(rawUrl);
  } catch {
    return null;
  }

  for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
    if (current.protocol !== "http:" && current.protocol !== "https:") {
      return null;
    }
    if (!(await assertPublicHost(current.hostname))) return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(current.toString(), {
        signal: controller.signal,
        redirect: "manual",
        headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) return null;
        current = new URL(location, current);
        continue;
      }

      if (!response.ok) return null;

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("text/html")) return null;

      const reader = response.body?.getReader();
      if (!reader) return null;

      let html = "";
      let received = 0;
      while (received < MAX_BYTES) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        html += Buffer.from(value).toString("utf8");
      }
      void reader.cancel().catch(() => {});

      return parseHtml(html);
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  return null;
}
