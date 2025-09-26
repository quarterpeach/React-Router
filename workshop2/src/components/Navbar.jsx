import React from 'react';
import { NavLink } from 'react-router';


function Navbar() {
  const linkStyles = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-white'
      : 'text-gray-400 hover:text-white';

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* ชื่อเว็บไซต์หรือโลโก้ */}
        <div className="text-white text-2xl font-bold">
          <NavLink to="/" >EsimData</NavLink>
        </div>

        {/* เมนูนำทาง */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <NavLink to="/" className={linkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className={linkStyles}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkStyles}>
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;