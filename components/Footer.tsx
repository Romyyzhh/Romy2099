"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Instagram, Twitter, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "./ScrollFloatComponent";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple reveal animation
            gsap.from(".footer-element", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                }
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const socialLinks = [
        { name: "Github", href: "https://github.com/romyyzh", icon: <Github size={24} /> },
    
        { name: "Instagram", href: "https://instagram.com/romyyzh_", icon: <Instagram size={24} /> },
   
    ];

    const menuItems = [
        { name: "HOME", href: "#home" },
        { name: "PROJECTS", href: "#projects" },
        { name: "ABOUT", href: "#about" },
        { name: "CONTACT", href: "#contact" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={footerRef} className="bg-[#050505] text-white pt-24 pb-2 px-6 md:px-12 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
               

                {/* Bottom Section */}
                <div className="footer-element flex flex-col md:flex-row justify-between items-end md:items-center pt-12 border-t border-white/10">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        Romyyzh © {currentYear}
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-transform hover:scale-110 duration-300"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
