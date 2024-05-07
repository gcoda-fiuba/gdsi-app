import {Montserrat} from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from './context/SnackbarContext';
import SnackbarComponent from './components/snackBar';
import NavBar from "@/app/components/navBar";

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
    <SnackbarProvider>
        <html lang="es">
          <body className={montserrat.className}>
            <NavBar />
              {children}
            <SnackbarComponent />
          </body>
        </html>
    </SnackbarProvider>
  );
}
