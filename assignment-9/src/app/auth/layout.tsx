import type { Metadata } from "next";
import "./../globals.css";

export const metadata: Metadata = {
  title: "Form Maker: Authentication",
  description: "Complete the form to sign in or sign up",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
