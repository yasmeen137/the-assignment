
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '../components/ui/Navbar'; // Corrected import path



// Define the fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}