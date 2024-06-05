import { Montserrat } from "next/font/google";
import "./globals.css";
import theme from "./theme";
import { SnackbarProvider } from './context/SnackbarContext';
import SnackbarComponent from './components/SnackBar';
import NavBar from "@/app/components/NavBar";
import {Box, ThemeProvider} from "@mui/material";

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
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
        </body>
        </html>
    );
}
