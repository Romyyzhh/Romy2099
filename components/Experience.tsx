"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ScrollRevealComponent";
import BlurText from "./BlurTextComponent";
import CircularGallery from "./CircularGallery";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
    const containerRef = useRef<HTMLElement>(null);

    const experiments = [
        {
            id: "001",
            title: "Artoverse",
            subtitle: "Pinterest Web Like",
            image: "/assets/arto.png",
            link: "https://github.com/Romyyzhh/ArtExplode-WebAppPromotion",
        },
        {
            id: "002",
            title: "Gym Majapahitz",
            subtitle: "Gym Website",
            image: "/assets/gymm.png",
            link: "https://github.com/Romyyzhh/GymMajapahitz",
        },
        {
            id: "003",
            title: "Furnishare",
            subtitle: "Marketplace",
            image: "/assets/uyguy.png",
            link: "https://github.com/Romyyzhh/project-noirve",
        },
        {
            id: "004",
            title: "Village Map Territory Area",
            subtitle: "Saripan Village Map",
            image: "/assets/map.png",
            link: "https://github.com/Romyyzhh/SIG-Journey-Maps",
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".experiment-card",
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="projects" className="relative min-h-screen bg-black py-20 px-4 md:px-6 lg:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
                    <div className="flex-1">
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                            textClassName="text-5xl md:text-7xl font-black uppercase text-white leading-tight mb-4"
                        >
                            WEB Development Projects
                        </ScrollReveal>
                    </div>

                    <div className="flex-1 max-w-xl">
                        <BlurText
                            text="These are my really beloved web projects, created to highlight my passion for frontend development and my commitment to high-quality, user-centered design. "
                            animateBy="words"
                            direction="top"
                            className="text-white/60 text-sm leading-relaxed mb-6 font-mono"
                        />

                    </div>
                </div>

                {/* Webflow Certification Badge */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-white/10"></div>
                    <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">

                        <span>SELECTED PORTFOLIO</span>
                    </div>
                    <div className="h-px flex-1 bg-white/10"></div>
                </div>

                {/* Experiments Grid - Stacked Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/20">
                    {experiments.map((experiment) => (
                        <div
                            key={experiment.id}
                            className="experiment-card group relative bg-black border-r border-b border-white/20 p-8 flex flex-col gap-6"
                        >
                            {/* Top: Experiment ID */}
                            <div className="text-white/40 text-xs font-mono uppercase tracking-widest">
                                EXPERIMENT_{experiment.id}
                            </div>

                            {/* Middle: Image */}
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white/5 group-image">
                                <Image
                                    src={experiment.image}
                                    alt={experiment.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* View Clonable Button - Overlay */}
                                <div className="absolute bottom-4 left-4 z-10">
                                    <a
                                        href={experiment.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-300"
                                    >
                                        <span>View Project</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Bottom: Content */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight">
                                    {experiment.title}
                                </h3>

                                {experiment.subtitle && (
                                    <p className="text-white/60 text-sm font-mono">{experiment.subtitle}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Graphic Design Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 mt-32">
                    <div className="flex-1">
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                            textClassName="text-5xl md:text-7xl font-black uppercase text-white leading-tight mb-4"
                        >
                            GRAPHIC DESIGN PROJECTS
                        </ScrollReveal>
                    </div>

                    <div className="flex-1 max-w-xl">
                        <BlurText
                            text="These are my most beloved graphic design projects, created for Instagram organizational accounts as well as various other design needs. Each project reflects my attention to visual consistency, branding, and aesthetic quality, with a strong focus on delivering engaging and impactful visual content."
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="text-white/60 text-sm leading-relaxed mb-6 font-mono"
                        />
                    </div>
                </div>

                {/* Circular Gallery Section */}
                <CircularGallery
                    items={[
                        { image: "/assets/aurora.jpg", text: "Shiny Green" },
                        { image: "/assets/aurorapurple.jpg", text: "Aurora Murasaki" },
                        { image: "/assets/aurora3.jpg", text: "Cliff Aurora" },
                        { image: "/assets/redeye.jpg", text: "Night Eye" },
                        { image: "/assets/redhorse.png", text: "Red Horse" },
                        { image: "/assets/kominfo.png", text: "Kominfo" },
                        { image: "/assets/ungu.png", text: "Advokasi" },
                        { image: "/assets/bph.png", text: "BPH" },
                        { image: "/assets/psdm.png", text: "PSDM" },
                        { image: "/assets/litbang.png", text: "Litbang" }
                    ]}
                    bend={0}
                    textColor="#ffffff"
                    borderRadius={0}
                    font="bold 24px sans-serif"
                    scrollSpeed={2}
                    scrollEase={0.08}
                />
            </div>
        </section>
    );
}
