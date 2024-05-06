import {Inter, Montserrat} from "next/font/google";
import "./globals.css";

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
    <html lang="es">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
