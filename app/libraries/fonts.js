import { Playpen_Sans,Caveat } from "next/font/google";

export const playpenSans=Playpen_Sans({
    subsets: ["latin"],
    weight:["400","500","600","700"],
    adjustFontFallback:false

})

export const caveat=Caveat({
    subsets: ["latin"],
    display: "swap",
    weight:["400","500","600","700"]
})