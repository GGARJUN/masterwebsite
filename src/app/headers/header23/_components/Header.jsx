"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const sidenav = [
    { name: "Blog", href: "/" },
    { name: "Shop", href: "/" },
    { name: "Partner", href: "/" },
    { name: "Free Resources", href: "/" },
    { name: "Career", href: "/" },
    { name: "FAQ", href: "/" },
  ]

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "#",
      subItems: [
        { name: "All Products", href: "/", img: "https://img.freepik.com/free-photo/3d-illustration-orange-vending-machine-full-food-drinks_1057-45831.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "New Arrivals", href: "/", img: "https://img.freepik.com/free-photo/anime-character-traveling_23-2151278694.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Best Sellers", href: "/", img: "https://img.freepik.com/free-photo/3d-illustration-asian-female-worker-with-food-grocery-store_1057-46058.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Categories", href: "/", img: "https://img.freepik.com/free-photo/abstract-3d-rendering-computer-interface-with-buttons-icons_1057-46147.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
      ],
    },
    {
      name: "Solutions",
      href: "#",
      subItems: [
        { name: "Marketing", href: "/", img: "https://img.freepik.com/free-photo/business-person-futuristic-business-environment_23-2150970188.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Analytics", href: "/", img: "https://img.freepik.com/free-photo/variety-people-multitasking-3d-cartoon-scene_23-2151294550.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Commerce", href: "/", img: "https://img.freepik.com/free-photo/view-professional-handshake-business-people_23-2150917018.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Insights", href: "/", img: "https://img.freepik.com/free-photo/programming-background-with-html-text_23-2150040418.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
      ],
    },
    { name: "Resources", href: "/" },
    { name: "Pricing", href: "/" },
  ];

  const socialMedia = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: "M16.5 2.5c-1.7 0-3.1 1.4-3.1 3.1v3.3H10V11h3.4v9.2h2.7V11h2.7l.4-2.1h-3.1V6.6c0-.6.4-1.1 1-1.1h2.1V2.5h-2.7z",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.5.2.9.5 1.2.8.3.3.6.7.8 1.2.2.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.5-.5.9-.8 1.2-.3.3-.7.6-1.2.8-.4.2-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.5-.2-.9-.5-1.2-.8-.3-.3-.6-.7-.8-1.2-.2-.4-.3-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.5.5-.9.8-1.2.3-.3.7-.6 1.2-.8.4-.2 1-.3 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 5.8.2 4.8.4 3.9.7c-1 .3-1.8.8-2.6 1.6C.5 3.1 0 4 0 5c-.1 1.2-.1 1.6-.1 4.8s0 3.6.1 4.8c.1 1.2.2 1.8.4 2.2.2.5.5.9.8 1.2.3.3.7.6 1.2.8.4.2 1 .3 2.2.4 1.2.1 1.6.1 4.8.1s3.6 0 4.8-.1c1.2-.1 1.8-.2 2.2-.4.5-.2.9-.5 1.2-.8.3-.3.6-.7.8-1.2.2-.4.3-1 .4-2.2.1-1.2.1-1.6.1-4.8s0-3.6-.1-4.8c-.1-1.2-.2-1.8-.4-2.2-.2-.5-.5-.9-.8-1.2-.3-.3-.7-.6-1.2-.8-.4-.2-1-.3-2.2-.4C15.7 0 15.3 0 12 0z",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Close sidebar and dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50 ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " ref={dropdownRef}>
        <div className="flex justify-between h-16 items-center ">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-extrabold  bg-gradient-to-r from-red-900 to-blue-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wide">
                MasterSite
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {navItems.map((item) => (
              <div key={item.name} className=" ">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center text-gray-100 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute -left-80 mt-4 w-5xl bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] rounded-md shadow-lg  z-50 flex">
                        {item.subItems.map((subItem) => (
                          <Link href={subItem.href} key={subItem.name} onClick={() => setOpenDropdown(null)} className=' flex w-full  items-center gap-5 px-5'>
                            <div className=' w-full h-full group cursor-pointer flex flex-col justify-center items- rounded-2xl'>
                              <div className='py-2  flex items-center gap-2 text-white group-hover:text-blue-400'>
                                <h1 className='text-xl font-semibold'>{subItem.name}</h1>
                                <ArrowRight className='group-hover:-rotate-45 duration-200 transition-all' />
                              </div>
                              <div className='rounded-2xl'>
                                <img src={subItem.img} alt={subItem.name} className='object-cover w-60 rounded-2xl py-6 group-hover:scale-110 transition-all duration-300' />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-100 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className=" flex items-center">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-blue-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <div className='text-white flex flex-col gap-1 justify-center items-end'>
                  <div className='bg-white w-5 h-1 rounded-full'></div>
                  <div className='bg-white w-8 h-1 rounded-full'></div>
                  <div className='bg-white w-3 h-1 rounded-full'></div>
                </div>
              )}
            </button>
          </div>
        </div>


        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
            <div className="flex justify-end px-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-100 hover:text-blue-600 hover:bg-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-2 px-4">
              {sidenav.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-100 hover:text-blue-600 hover:bg-gray-700 rounded-md"
                      >
                        {item.name}
                        {openDropdown === item.name ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-600 hover:bg-gray-700 rounded-md"
                              onClick={() => {
                                setIsSidebarOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              <div className="group cursor-pointer flex flex-col justify-center items-center">
                                <div className="py-2 flex items-center gap-2 group-hover:text-blue-600">
                                  <h1 className="text-base font-medium">{subItem.name}</h1>
                                  <ArrowRight className="group-hover:-rotate-45 duration-200 transition-all h-5 w-5" />
                                </div>
                                <img
                                  src={subItem.img}
                                  alt={subItem.name}
                                  className="object-cover w-full h-40 py-3 group-hover:scale-105 transition-all duration-300"
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-100 hover:text-blue-600 hover:bg-gray-700 rounded-md"
                      onClick={() => {
                        setIsSidebarOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {/* Social Media Icons */}
            <div className="mt-auto px-4 py-4 border-t border-gray-700">
              <div className="flex space-x-4 justify-center">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </nav>
    </header >
  );
};

export default Header;