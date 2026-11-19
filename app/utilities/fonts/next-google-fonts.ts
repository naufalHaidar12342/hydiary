import { Caveat, IBM_Plex_Mono, Playpen_Sans } from "next/font/google";
import localFont from "next/font/local";

export const playpenSans = Playpen_Sans({
  variable: "--font-playpen-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// in case next/font having problem
// connecting to google font api,
// open sans will be the default font
// (fall back)

export const openSans = localFont({
  variable: "--font-open-sans",
  display: "fallback",
  src: [
    {
      path: "./open-sans/open-sans-v44-latin_latin-ext-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./open-sans/open-sans-v44-latin_latin-ext-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./open-sans/open-sans-v44-latin_latin-ext-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./open-sans/open-sans-v44-latin_latin-ext-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./open-sans/open-sans-v44-latin_latin-ext-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./open-sans/open-sans-v44-latin_latin-ext-italic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
});
