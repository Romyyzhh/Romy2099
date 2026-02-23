

"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurTextComponent";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        id: "01",
        title: "Slayer",
        category: " Photo Manipulation",
        date: "2021",
        image: "/assets/demon2.png",
    },
    {
        id: "02",
        title: "Osaka",
        category: " Photo Manipulation",
        date: "2022",
        image: "/assets/romyhandsome.jpg",
    },
    {
        id: "03",
        title: "Riding",
        category: " Dreamy Color Grading",
        date: "2025",
        image: "/assets/1000482395-01.jpeg",
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const textsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Ensure ScrollTrigger is registered
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Safety check: ensure refs are populated
            if (!containerRef.current || imagesRef.current.some(r => !r) || textsRef.current.some(r => !r)) {
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "+=3000",
                    invalidateOnRefresh: true, // Handle resize/layout changes better
                }
            });

            projects.forEach((_, i) => {
                if (i === 0) {
                    // Initial state for first project
                    if (imagesRef.current[i] && textsRef.current[i]) {
                        gsap.set(imagesRef.current[i], { yPercent: 0, zIndex: 1 });
                        gsap.set(textsRef.current[i], { yPercent: 0, opacity: 1 });
                    }
                } else {
                    // Initial state for others
                    if (imagesRef.current[i] && textsRef.current[i]) {
                        gsap.set(imagesRef.current[i], { yPercent: 100, zIndex: i + 1 });
                        gsap.set(textsRef.current[i], { yPercent: 100, opacity: 0 });

                        // Animate in
                        tl.to(imagesRef.current[i], { yPercent: 0, duration: 1, ease: "power2.inOut", force3D: true }, i - 1);
                        tl.to(textsRef.current[i], { yPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut", force3D: true }, i - 1);

                        // Animate out previous
                        if (imagesRef.current[i - 1] && textsRef.current[i - 1]) {
                            tl.to(imagesRef.current[i - 1], { yPercent: -100, duration: 1, ease: "power2.inOut", force3D: true }, i - 1);
                            tl.to(textsRef.current[i - 1], { yPercent: -100, opacity: 0, duration: 1, force3D: true }, i - 1);
                        }
                    }
                }
            });

            // Add a final pause
            tl.to({}, { duration: 0.5 });

        }, containerRef);

        // Force refresh after a short delay to ensure layout is settled
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <section ref={containerRef} id="gallery" className="relative h-screen bg-black overflow-hidden flex items-center justify-center">

            {/* Images Container - Smaller size as requested */}
            <div className="relative w-[90vw] h-[30vh] md:w-[65vw] md:h-[65vh] overflow-hidden rounded-[2rem]">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        ref={el => { imagesRef.current[index] = el }}
                        className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#111]"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                ))}
            </div>

            {/* Text Overlay - Changes on scroll */}
            <div className="absolute inset-0 pointer-events-none z-50">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        ref={el => { textsRef.current[index] = el }}
                        className="absolute inset-0 flex flex-col justify-between p-8 md:p-16"
                    >
                        {/* Top Info */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <span className="text-white/60 font-mono">00.{index + 1}</span>
                                <div className="w-12 h-px bg-white/20"></div>
                            </div>
                            <div className="text-right hidden md:block">
                                <span className="block text-white/60 text-xs tracking-widest uppercase">hall of fame</span>
                            </div>
                        </div>

                        {/* Main Title - Huge & Bold */}
                        <div className="absolute top-[65%] left-0 w-full -translate-y-1/2 px-8 md:px-16">
                            <div className="text-[14vw] font-black text-white leading-none tracking-tighter mix-blend-difference">
                                <BlurText
                                    text={project.title}
                                    delay={50}
                                    animateBy="letters"
                                    direction="bottom"
                                    className="inline-block"
                                />
                            </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{project.title}</p>
                                <p className="text-white font-bold text-sm uppercase tracking-wider">{project.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Date</p>
                                <p className="text-white font-bold text-sm uppercase tracking-wider">{project.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
                {projects.map((_, i) => (
                    <div key={i} className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-white origin-top scale-y-0 transition-transform duration-300"></div>
                    </div>
                ))}
            </div>

        </section>
    );
}
