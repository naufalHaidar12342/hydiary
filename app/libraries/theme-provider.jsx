"use client"
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


export function ThemeProvider({ children }) {
    return <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>
    </NextUIProvider>
}