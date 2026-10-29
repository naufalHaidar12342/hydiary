import Footer from "./components/Footer";
import "./globals.css";
import { ThemeProvider } from "./libraries/theme-provider";
import type { Metadata } from "next";
import {
  playpenSans,
  caveat,
  ibmPlexMono,
  openSans,
} from "./utilities/fonts/next-google-fonts";
import StandingNavigation from "./components/StandingNavigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Hydiary",
    default: "Hydiary",
  },
  description:
    "Just a small corner on the internet for sharing my thoughts, things I have learned so far, and many more",
  creator: "naufalHaidar12342 (Naufal Haidar)",
  authors: [{ name: "Naufal Haidar" }],
  publisher: "Naufal Haidar",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: {
      template: "%s | Hydiary",
      default: "Hydiary",
    },
    description:
      "Just a small corner on the internet for sharing my thoughts, things I have learned so far, and many more",
    url: "https://hydiary.my.id",
    siteName: "Hydiary",
    type: "website",
    images: [
      {
        url: "/pexels-nguyendesigner-239550-caesium-compressed.jpg",
        alt: "Open notebook with handwritten notes next to a mobile phone on a wooden desk in a dimly lit indoor setting. Photo by Pew Nguyen on Pexels",
        width: 1200,
        height: 630,
        type: "picture",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playpenSans.variable} ${caveat.variable} ${ibmPlexMono.variable} ${openSans.variable} antialiased`}
    >
      <body className="font-(family-name:--font-playpen-sans) w-full max-w-7xl min-h-screen flex flex-col mx-auto text-hydiary-secondary bg-gray-950 bg-linear-to-b from-darkblue-gradient to-dark-gradient p-6 my-10">
        <div className="flex flex-row-reverse p-4 ">
          <section className="hidden lg:ml-4 lg:flex lg:flex-row-reverse lg:justify-center">
            <StandingNavigation />
            <div className="mr-10 w-2 bg-linear-to-b from-10% from-hydiary-primary/0  via-hydiary-accent to-70% to-hydiary-primary/0 rounded-sm" />
          </section>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
