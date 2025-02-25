"use client";
import React, { useEffect, useState } from "react";
import { NavbarRoutes } from "../routes/NavbarRoutes";
import Link from "next/link";
import DropdownMenu from "../DropMenu/DropMenuNavbar";
import ClickOutside from "../ClickOutside";
import nextConfig from "@/../next.config";
const { basePath } = nextConfig;
const iconLogo = `/logofilm.png`;

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>("Trang chủ");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Đóng submenu khi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false); // Tự động đóng menu khi màn hình lớn hơn 768px
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ClickOutside onClick={() => setOpenMenu(null)}>
      <nav className="bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-700">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-600"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center space-x-3 m-[0px] ${
                isMobileMenuOpen ? "hidden" : "block"
              }`}
              onClick={() => setActiveMenu("Trang chủ")}
            >
              <img src={iconLogo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold text-white">
                PhimPlus
              </span>
            </Link>
          </div>
          {/* Navigation Menu */}
          <div
            className={`${
              isMobileMenuOpen
                ? "block absolute top-[72px] border-t border-b border-gray-500 left-0 right-0 overflow-y-scroll h-[60vh]"
                : "hidden"
            } md:block md:w-auto bg-black md:bg-transparent `}
          >
            <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 md:mt-0 md:space-x-8">
              {NavbarRoutes.map((route, index) => (
                <li key={index} className="relative">
                  {route.href ? (
                    <Link
                      href={route.href}
                      onClick={() => {
                        setActiveMenu(route.name);
                        setIsMobileMenuOpen(false);
                        setOpenMenu(null);
                      }}
                      className={`block py-2 px-3 rounded-md text-white transition ${
                        activeMenu === route.name
                          ? "bg-blue-600 font-bold"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      {route.name}
                    </Link>
                  ) : (
                    route.children && (
                      <DropdownMenu
                        label={route.name}
                        options={route.children}
                        isOpen={openMenu === route.name}
                        setOpenMenu={setOpenMenu}
                        isMobileMenuOpen={isMobileMenuOpen}
                        parent={route.name}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                      />
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Search + Toggle Menu Button */}
          <div className="flex items-center">
            {/* Search Icon */}
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)}>
              <svg
                className="w-5 h-5 text-white hover:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </ClickOutside>
  );
};

export default Navbar;
