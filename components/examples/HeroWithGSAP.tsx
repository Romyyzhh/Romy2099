"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    revealText,
    parallaxScroll,
    floatingAnimation,
    navbarScrollEffect,
} from "@/lib/gsapAnimations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * CONTOH IMPLEMENTASI: Hero Section dengan GSAP
 * 
 * Menggunakan GSAP untuk:
 * - Text reveal animation (character by character)
 * - Parallax background scroll
 * 
 * Menggunakan Framer Motion untuk:
 * - Gradient animation (reactive)
 * - Simple fade transitions
 */

export default function HeroWithGSAP() {
    const titleRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Split text untuk animate per character
        if (titleRef.current) {
            const text = titleRef.current.textContent || "";
            titleRef.current.innerHTML = text
                .split("")
                .map((char) => `<span class="char">${char}</span>`)
                .join("");

            // GSAP: Reveal text animation
            revealText(".char", {
                duration: 0.6,
                stagger: 0.05,
                delay: 0.5,
            });
        }

        // GSAP: Parallax background
        if (backgroundRef.current) {
            parallaxScroll(backgroundRef.current, 0.3);
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* GSAP: Parallax Background */}
            <div ref={backgroundRef} className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-purple-900" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    {/* GSAP: Text Reveal */}
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-black uppercase mb-6"
                        style={{ perspective: "400px" }}
                    >
                        Muhammad Alvin Karomy
                    </h1>

                    {/* Framer Motion: Simple fade in */}
                    <motion.p
                        className="text-xl text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        Let&apos;s create something beautiful together!
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
