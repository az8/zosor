"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import StoreProvider from "./StoreProvider";
import AppBar from "../lib/components/AppBar/AppBar";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Excercises",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = "Exercises";
    const path = pathname?.split("/")[1] ? pathname?.split("/")[1] : "1";
  }, [pathname]);

  return (

    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppBar />
          <Grid container sx={{ width: "100%", p: 0, m: 0 }}>
            <Grid item
              xs={12}
            >
              {children}
            </Grid>
          </Grid>
        </StoreProvider>
      </body>
    </html>

  );
}