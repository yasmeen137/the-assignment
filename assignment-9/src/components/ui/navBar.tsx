import React, { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode; // Mark children as optional
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-purple-800 text-white">
      <div className="text-2xl font-bold">Form Maker</div>

      {children && <div>{children}</div>} {/* Render children if they exist */}
    </nav>
  );
};

export default Navbar;
