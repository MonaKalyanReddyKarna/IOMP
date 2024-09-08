import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { fontDmSans } from "@/lib/fonts";
import React from "react";

export const metadata: Metadata = {
  title: "Real Time Disaster Aggregation Software",
  description: "A Web Based Aggregation Software that utilizes scrapers to gather information from social media and news portals about ongoing disasters, which is then categorized using machine learning algorithms and processed by the backend and further represents the aggregated data in a user-friendly dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-dm antialiased",
          fontDmSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1 mt-20">
            {/* <img className="w-full" src="/ndrf_header.png" alt="" /> */}
            {children}

          </div>
          {/*<Footer />*/}
        </div>

        <Toaster />
      </body>
    </html>
  );
}
