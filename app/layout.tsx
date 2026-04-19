"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import StoreProvider from "./StoreProvider";
import AppDrawer from "../lib/components/appdrawer/AppDrawer";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import AppSwitchShortcut from "../lib/components/appswitchshortcut/AppSwitchShortcut";
import AppDrawerToggle from "../lib/components/appdrawertoggle/AppDrawerToggle";


const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Zosor",
  description: "Zosor",
};

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const theme = useTheme();

  useEffect(() => {
    document.title = "Zosor";
    const path = pathname?.split("/")[1] ? pathname?.split("/")[1] : "games";
  }, [pathname]);

  const [open, setOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState("games");

  const handleDrawerOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Box sx={{ display: 'flex', position: "relative" }}>
            <CssBaseline />
            <AppDrawerToggle handleDrawerOpen={handleDrawerOpen} open={open} />
            {/* <AppSwitchShortcut handleSwitchApp={handleDrawerOpen} activeTab={currentTab} /> */}
            <AppDrawer open={open} drawerWidth={drawerWidth} />
            <Main open={open}>
              {children}
            </Main>
          </Box>
        </StoreProvider>
      </body>
    </html>
  );
}
