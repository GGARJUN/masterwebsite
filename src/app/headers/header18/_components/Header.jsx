"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const navItems = [
        {
            name: "Dashboard",
            href: "/",
        },
        {
            name: "Components",
            href: "/",
            subItems: [
                { name: "Buttons", href: "/" },
                { name: "Forms", href: "/" },
                { name: "Cards", href: "/" },
            ],
        },
        {
            name: "Templates",
            href: "/",
            subItems: [
                { name: "Landing Pages", href: "/" },
                { name: "Dashboards", href: "/" },
                { name: "E-commerce", href: "/" },
            ],
        },
        {
            name: "Settings",
            href: "/",
        },
    ];

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <span className="text-2xl font-extrabold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wide">
                                MasterSite
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative">
                                {item.subItems ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                                        >
                                            {item.name}
                                            {openDropdown === item.name ? (
                                                <ChevronUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            )}
                                        </button>
                                        {openDropdown === item.name && (
                                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-3">
                        {navItems.map((item) => (
                            <div key={item.name} className="px-2 pt-2">
                                {item.subItems ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                        >
                                            {item.name}
                                            {openDropdown === item.name ? (
                                                <ChevronUp className="h-5 w-5" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5" />
                                            )}
                                        </button>
                                        {openDropdown === item.name && (
                                            <div className="pl-4">
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                                        onClick={() => {
                                                            setIsMobileMenuOpen(false);
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
