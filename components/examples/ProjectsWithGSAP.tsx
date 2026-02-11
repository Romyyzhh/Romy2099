"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeInStaggerScroll, imageRevealScroll } from "@/lib/gsapAnimations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * CONTOH IMPLEMENTASI: Projects Section dengan GSAP
 * 
 * Menggunakan GSAP untuk:
 * - Scroll-triggered stagger untuk cards
 * - Image reveal dengan clip-path
 * 
 * Menggunakan Framer Motion untuk:
 * - Hover interactions
 * - Button animations
 */

export default function ProjectsWithGSAP() {
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll(".project-card");
            const images = cardsRef.current.querySelectorAll(".project-image");

            // GSAP: Stagger animation on scroll
            fadeInStaggerScroll(Array.from(cards), {
                duration: 0.8,
                stagger: 0.2,
                y: 80,
            });

            // GSAP: Image reveal animation
            images.forEach((img) => {
                imageRevealScroll(img);
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const projects = [
        { id: 1, title: "Project 1", description: "Description 1" },
        { id: 2, title: "Project 2", description: "Description 2" },
        { id: 3, title: "Project 3", description: "Description 3" },
    ];

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-black text-center mb-16 text-white">
                    My Projects
                </h2>

                <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            {/* GSAP: Image reveal */}
                            <div className="project-image relative h-64 bg-purple-900 rounded-lg overflow-hidden mb-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500" />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 mb-4">{project.description}</p>

                            {/* Framer Motion: Button hover */}
                            <motion.button
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Project
                            </motion.button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
