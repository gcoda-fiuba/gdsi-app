import React from 'react';
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from './context/SnackbarContext';
import SnackbarComponent from './components/SnackBar';
import NavBar from "@/app/components/NavBar";
import {Box} from "@mui/material";
import ColorModeProvider from "@/app/context/ThemeContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    icons: {
        icon: "@/../favicon.ico",
    },
    title: "BillBuddies",
    description: "Clone of splitwise app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={montserrat.className}>
        <body>
        <React.StrictMode>
            <ColorModeProvider>
                <SnackbarProvider>
                    <NavBar />
                    <Box
                        sx={{
                            height: 'calc(100vh - 64px)',
                            overflow: 'auto',
                        }}
                    >
                        {children}
                    </Box>
                    <SnackbarComponent />
                </SnackbarProvider>
            </ColorModeProvider>
        </React.StrictMode>
        </body>
        </html>
    );
}
