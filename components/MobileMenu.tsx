"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import DecryptedText from "./DecryptedTextComponent";

interface MenuItem {
    label: string;
    link: string;
}

interface MobileMenuProps {
    items: MenuItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10001]"
                    />

                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[300px] bg-[#000000] border-l border-white/10 z-[10002] p-8 flex flex-col shadow-2xl"
                        style={{ backgroundColor: "#000000" }} // Force solid black
                    >
                        {/* Header */}
                        <div className="flex justify-end mb-12">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white hover:text-red-400 transition-colors"
                                aria-label="Close Menu"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav className="flex flex-col gap-8">
                            {items.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.link}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="text-2xl font-bold text-white hover:text-gray-300 transition-colors uppercase tracking-wider block w-fit"
                                >
                                    <DecryptedText
                                        text={item.label}
                                        animateOn="hover"
                                        speed={50}
                                        maxIterations={20}
                                        characters="1010101010"
                                        className="text-white"
                                        encryptedClassName="text-neon-green font-mono"
                                        sequential={true}
                                    />
                                </motion.a>
                            ))}
                        </nav>

                        {/* Footer / Socials (Optional) */}
                        <div className="mt-auto pt-8 border-t border-white/10">
                            <p className="text-gray-500 text-sm">
                                © 2024 Portfolio
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Toggle Button - Fixed at top right */}
            <div className="fixed top-0 right-0 p-6 z-[10000] md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Render menu via Portal to ensure it's on top of everything */}
            {mounted && createPortal(menuContent, document.body)}
        </>
    );
}
