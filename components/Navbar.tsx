"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gamepad2, MessageSquare, Store, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navbarScrollEffect } from "@/lib/gsapAnimations";
import { HoverBinaryDecrypt } from "./ui/TextAnimations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (navRef.current) {
            navbarScrollEffect(navRef.current);
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const navItems = [
        { name: "HOME", href: "#home" },
        { name: "ABOUT", href: "#about" },
        { name: "PROJECTS", href: "#projects" },
        { name: "CONTACT", href: "#contact" },

    ];

    const menuItems = navItems.map(item => ({
        label: item.name,
        link: item.href
    }));


    return (
        <>
            {/* Top Navbar */}
            <motion.nav
                ref={navRef}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent [&.scrolled]:bg-dark/80 [&.scrolled]:backdrop-blur-md [&.scrolled]:shadow-lg"
            >
                <div className="container mx-auto px-9 py-4">
                    <div className="flex items-center justify-between">


                        {/* Navigation Menu */}
                        <div className="hidden md:flex items-center space-x-12">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-display font-bold text-gray-300 hover:text-neon-white tracking-widest transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <HoverBinaryDecrypt text={item.name} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <MobileMenu items={menuItems} />
                        </div>

                    </div>
                </div>
            </motion.nav>
        </>
    );
}
