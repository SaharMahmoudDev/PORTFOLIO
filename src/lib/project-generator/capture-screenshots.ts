import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Browser, HTTPRequest } from "puppeteer-core";
import { env } from "@/config/env";
import { assertPublicHost } from "./fetch-url";

const VIEWPORT = { width: 1440, height: 900 };
const NAV_TIMEOUT_MS = 20_000;
const SETTLE_MS = 1_500;

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

export type ProjectScreenshots = { light: Buffer; dark: Buffer };

function findChrome() {
  const candidates = env.CHROME_EXECUTABLE_PATH
    ? [env.CHROME_EXECUTABLE_PATH]
    : CHROME_CANDIDATES;
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

export async function captureProjectScreenshots(
  url: string,
): Promise<ProjectScreenshots | null> {
  if (process.env.VERCEL) return null;

  const executablePath = findChrome();
  if (!executablePath) {
    console.error("capture: no Chrome/Edge found");
    return null;
  }

  const hostChecks = new Map<string, Promise<boolean>>();
  const isPublic = (hostname: string) => {
    let check = hostChecks.get(hostname);
    if (!check) {
      check = assertPublicHost(hostname);
      hostChecks.set(hostname, check);
    }
    return check;
  };

  const guard = async (request: HTTPRequest) => {
    if (request.isInterceptResolutionHandled()) return;
    try {
      const target = new URL(request.url());
      if (["data:", "blob:", "about:"].includes(target.protocol)) {
        return await request.continue();
      }
      const web = target.protocol === "http:" || target.protocol === "https:";
      if (web && (await isPublic(target.hostname))) {
        return await request.continue();
      }
    } catch {}
    if (!request.isInterceptResolutionHandled()) await request.abort();
  };

  let browser: Browser | undefined;
  try {
    const moduleName = "puppeteer-core";
    const { default: puppeteer } = (await import(
      /* turbopackIgnore: true */ /* webpackIgnore: true */ moduleName
    )) as typeof import("puppeteer-core");
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ["--hide-scrollbars"],
    });

    const shots: Partial<ProjectScreenshots> = {};

    for (const scheme of ["light", "dark"] as const) {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);
      await page.setCacheEnabled(false);
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: scheme },
      ]);
      await page.setRequestInterception(true);
      page.on("request", (request) => void guard(request));

      try {
        const response = await page.goto(url, {
          waitUntil: "networkidle2",
          timeout: NAV_TIMEOUT_MS,
        });
        if (response && !response.ok() && response.status() !== 304) {
          console.error("capture: bad status", response.status());
          return null;
        }
      } catch (error) {
        if (!(error instanceof Error && error.name === "TimeoutError")) {
          console.error("capture: navigation failed", error);
          return null;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));
      const image = await page.screenshot({ type: "jpeg", quality: 82 });
      shots[scheme] = Buffer.from(image);
      await page.close();
    }

    return shots.light && shots.dark
      ? { light: shots.light, dark: shots.dark }
      : null;
  } catch (error) {
    console.error("captureProjectScreenshots failed", error);
    return null;
  } finally {
    await browser?.close().catch(() => {});
  }
}

export function saveProjectScreenshots(
  key: string,
  shots: ProjectScreenshots,
): { imageLight: string; imageDark: string } | null {
  try {
    const dir = path.join(process.cwd(), "public", "images", "projects");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${key}-light.jpg`), shots.light);
    fs.writeFileSync(path.join(dir, `${key}-dark.jpg`), shots.dark);
    return {
      imageLight: `/images/projects/${key}-light.jpg`,
      imageDark: `/images/projects/${key}-dark.jpg`,
    };
  } catch (error) {
    console.error("saveProjectScreenshots failed", error);
    return null;
  }
}
