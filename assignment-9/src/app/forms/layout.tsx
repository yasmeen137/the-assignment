import type { Metadata } from "next";
import Navbar from "@/components/ui/navBar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import ProtectedRoute from "@/components/protectedRoute";

export const metadata: Metadata = {
  title: "Form Maker",
  description: "Create and manage forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-purple-200 z-50 shadow-md">
        <Navbar>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-4 py-2 text-white bg-blue-700 hover:bg-blue-900 rounded-md">
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black shadow-md rounded-lg w-48">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="/settings"
                    className="block py-2 px-4 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/forms"
                    className="block py-2 px-4 hover:bg-gray-200"
                  >
                    All Forms
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/forms/responses"
                    className="block py-2 px-4 hover:bg-gray-200"
                  >
                    Response
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/help"
                    className="block py-2 px-4 hover:bg-gray-200"
                  >
                    Help
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/auth/logout"
                    className="block py-2 px-4 hover:bg-gray-200"
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Navbar>
      </div>

      <ProtectedRoute>{children}</ProtectedRoute>
    </div>
  );
}
