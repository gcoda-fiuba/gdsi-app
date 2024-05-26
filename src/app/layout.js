import { Montserrat } from "next/font/google";
import "./globals.css";
import theme from "./theme";
import { SnackbarProvider } from './context/snackbarContext';
import SnackbarComponent from './components/snackBar';
import NavBar from "@/app/components/navBar";
import { ThemeProvider } from "@mui/material";

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
                <div>
                    {children}
                </div>
                <SnackbarComponent />
            </SnackbarProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
