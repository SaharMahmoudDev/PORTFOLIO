import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";

/** Headings / display — `.display` in the canvas. */
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Body copy — canvas default. */
export const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

/** Labels, nav, terminal text — `.mono` in the canvas. */
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/** Space-joined variable classes for the root <html>. */
export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
