"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from "./DecryptedTextComponent";
import ScrollReveal from "./ScrollRevealComponent";
import ProfileCardComponent from "./ProfileCardComponent";
import AboutDescription from "./AboutDescription";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const containerRef = useRef<HTMLElement>(null);

    const techStack = [
        { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, // Might need white filter
        { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Framer", src: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
        { name: "GSAP", src: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".about-fade",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    force3D: true, // GPU acceleration
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="relative min-h-screen bg-black py-16 md:py-20 px-4 sm:px-6 lg:px-12 flex items-center overflow-hidden">


            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center">

                    {/* Left Side - Text Content */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Name */}
                        <div className="about-fade">
                            <h1 className="font-black uppercase leading-none tracking-tighter text-[2.5rem] sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                                style={{ wordBreak: 'keep-all' }}>
                                <div className="text-white">MUHAMMAD</div>
                                <div className="text-white">ALVIN</div>
                                <div className="text-white">KAROMY</div>
                            </h1>
                        </div>

                        {/* Title */}
                        <div className="about-fade">
                            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white/80 uppercase tracking-wide break-words">
                                <DecryptedText
                                    text="EXPERIENCED GRAPHIC & VISUAL DESIGNER - Frontend Developer"
                                    animateOn="view"
                                    revealDirection="center"
                                />
                            </h2>
                        </div>

                        {/* Status */}
                        <div className="about-fade flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-green-400 text-sm font-medium">Available for new projects</span>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <div className="about-fade">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white/90 transition-all duration-300 group"
                            >
                                CONTACT ME
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>


                    </div>

                    {/* Right Side - Profile Photo */}
                    <div className="about-fade relative flex justify-center lg:justify-end">
                        <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md">
                            <ProfileCardComponent
                                avatarUrl="/assets/ugvvg.jpeg"
                                miniAvatarUrl="/assets/ugvvg.jpeg"
                                name="Muhammad Alvin Karomy"
                                title="Frontend Developer"
                                handle="romyyzh"
                                status="Available for work"
                                contactText="Hire Me"
                                onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                enableTilt={true}
                                enableMobileTilt={true}
                                behindGlowColor="#e7e7e7ff"
                                innerGradient="none"
                                showUserInfo={false}
                                showDetails={false}
                            />
                        </div>
                    </div>
                </div>

                {/* About Description Section */}
                <AboutDescription />
            </div>
        </section>
    );
}
