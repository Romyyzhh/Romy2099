"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import AuroraBackground from "./AuroraBackground";
import TextPressure from "./TextPressureComponent";
import gsap from "gsap";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [amplitude, setAmplitude] = useState(1.0);

    useEffect(() => {
        const handleResize = () => {
            setAmplitude(window.innerWidth < 768 ? 1.2 : 1.0);
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in other elements with GPU acceleration
            gsap.from(".hero-fade", {
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 1.5,
                ease: "power2.out",
                force3D: true, // Enable GPU acceleration
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} id="home" className="relative min-h-[100svh] md:h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-between">

            {/* Pure Black Background - No Aurora */}

            {/* Main Typography */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center pt-20 md:pt-32 pb-8 md:pb-0 w-full max-w-[90vw] mx-auto mix-blend-difference">
                <TextPressure
                    text="PORTFOLIO"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#FFFFFF"
                    minFontSize={36}
                />
            </div>

            {/* Bottom Bar */}
            <div className="relative z-20 w-full px-6 md:px-12 pb-6 md:pb-12 flex flex-col md:flex-row items-center justify-center gap-8">



                {/* Center: Status */}
                <div className="hero-fade hidden md:flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm font-medium text-white/60 bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>Available now</span>
                    </div>
                    <span className="hidden md:inline">•</span>
                    <span>Indonesia</span>
                    <span className="hidden md:inline">•</span>
                    <span className="text-center">Global projects welcome</span>
                </div>


            </div>

        </section>
    );
}
