import type { Metadata } from "next";
import { Cormorant_Garamond,Manrope } from "next/font/google";
import { OrdersProvider } from "@/components/orders-provider";
import { Suspense } from "react";
import "./globals.css";
const serif=Cormorant_Garamond({subsets:["latin"],variable:"--font-serif",weight:["500","600","700"]});
const sans=Manrope({subsets:["latin"],variable:"--font-sans"});
export const metadata:Metadata={title:{default:"StitchFlow Studio",template:"%s | StitchFlow Studio"},description:"Bespoke tailoring, beautifully organized."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><Suspense><OrdersProvider>{children}</OrdersProvider></Suspense></body></html>}
