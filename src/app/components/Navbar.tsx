'use client'

import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Poppins } from "next/font/google";
import { usePathname } from 'next/navigation'; // Import useRouter

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
});

export const Navbar: React.FC = () => {
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const pathname = usePathname(); 
    const isHomePage = pathname === '/'; // Check if current route is the home page

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            if (scrollTop > lastScrollTop && scrollTop > 180) {
                // User is scrolling down and has passed the threshold
                setIsScrolledDown(true);
            } else if (scrollTop < lastScrollTop) {
                // User is scrolling up
                setIsScrolledDown(false);
            }

            setLastScrollTop(scrollTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop]);

    // Return null if on the home page
    if (isHomePage) return null;

    return (
        <Box
            className={`w-full h-fit p-0 m-0 fixed top-0 left-0 transition-transform duration-1000 ${poppins.className}`}
            sx={{
                background: "white",
                transform: isScrolledDown ? "translateY(-100%)" : "translateY(0)",
                boxShadow: isScrolledDown ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                zIndex: '5'
            }}
        >
            <Box className="flex justify-center items-center">
                <Box className="flex justify-center">
                    <Box component="img" className="p-1" src="/img/logo.png" sx={{ width: '80px', marginRight: '-20px' }} />
                    <Box component="img" className="p-1 mt-5" src="/img/wok4.png" sx={{ width: '100px', height: '30px' }} />
                </Box>
            </Box>

            <Box className="flex gap-28 justify-center p-4 pb-4">
                <Link href="/home">
                    <div className="text-[#fbc800] font-semibold hover:font-black duration-150 hover:text-black">Home</div>
                </Link>
                <Link href="/Region">
                    <div className="text-[#fbc800] font-semibold hover:font-black duration-150 hover:text-black">Region</div>
                </Link>
                <Link href="/cart">
                    <div className="text-[#fbc800] font-semibold hover:font-black duration-150 hover:text-black">Cart</div>
                </Link>
                <Link href="/about">
                    <div className="text-[#fbc800] font-semibold hover:font-black duration-150 hover:text-black">About</div>
                </Link>
            </Box>
        </Box>
    );
};
