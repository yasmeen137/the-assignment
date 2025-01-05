"use client";

import { Avatar, AvatarFallback, AvatarImage } from './avatar'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'; 
import Link from "next/link";
import React from 'react';

const NavBar = () => {
  return (
    <div className="bg-red-800 text-white py-3 px-5 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link href="/">Anime Insight</Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/category" className="hover:text-gray-300">
            Category
          </Link>
        </li>
        <li>
          <Link href="/news" className="hover:text-gray-300">
            News
          </Link>
        </li>
        <li>
          <Link href="/settings" className="hover:text-gray-300">
            Settings
          </Link>
        </li>
      </ul>

      {/* User Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://uploads.turbologo.com/uploads/design/preview_image/4551835/preview_image20240724-1-su0kei.png" />
            <AvatarFallback>YS</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="text-sm hover:text-gray-700">
              View Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings" className="text-sm hover:text-gray-700">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="text-sm hover:text-gray-700">Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBar;
