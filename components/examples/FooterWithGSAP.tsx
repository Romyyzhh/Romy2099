"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { floatingAnimation, waveAnimation } from "@/lib/gsapAnimations";

/**
 * CONTOH IMPLEMENTASI: Footer dengan Ship Animation
 * 
 * Menggunakan GSAP untuk:
 * - Floating ship animation (continuous loop)
 * - Wave animation (continuous loop)
 * - Smooth, physics-based movement
 */

export default function FooterWithGSAP() {
    const shipRef = useRef<HTMLDivElement>(null);
    const wave1Ref = useRef<HTMLDivElement>(null);
    const wave2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP: Ship floating animation
        if (shipRef.current) {
            // Vertical floating
            floatingAnimation(shipRef.current, {
                duration: 3,
                y: 15,
                ease: "sine.inOut",
            });

            // Subtle rotation for realism
            gsap.to(shipRef.current, {
                rotation: 3,
                duration: 4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }

        // GSAP: Wave animations (different speeds)
        if (wave1Ref.current) {
            waveAnimation(wave1Ref.current);
        }

        if (wave2Ref.current) {
            gsap.to(wave2Ref.current, {
                x: -150,
                duration: 15,
                ease: "none",
                repeat: -1,
            });
        }

        // No cleanup needed for infinite animations
    }, []);

    return (
        <footer className="relative h-96 bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
            {/* GSAP: Animated Waves */}
            <div className="absolute bottom-0 left-0 right-0">
                {/* Wave 1 (Fast) */}
                <div
                    ref={wave1Ref}
                    className="absolute bottom-0 left-0 w-[200%] h-32"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%230ea5e9' opacity='0.5'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "repeat-x",
                        backgroundSize: "800px 100px",
                    }}
                />

                {/* Wave 2 (Slow) */}
                <div
                    ref={wave2Ref}
                    className="absolute bottom-0 left-0 w-[200%] h-24"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%230284c7' opacity='0.7'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "repeat-x",
                        backgroundSize: "800px 88px",
                    }}
                />
            </div>

            {/* GSAP: Floating Ship */}
            <div
                ref={shipRef}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl"
                style={{ transformOrigin: "center bottom" }}
            >
                ⛵
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 pt-16 text-white text-center">
                <p className="text-sm">© 2024 Muhammad Alvin Karomy</p>
            </div>
        </footer>
    );
}
