"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
    image: string;
    text: string;
}

interface HorizontalScrollGalleryProps {
    items: GalleryItem[];
}

export default function HorizontalScrollGallery({ items }: HorizontalScrollGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    // Duplicate items for smoother scrolling experience
    const duplicatedItems = [...items, ...items, ...items];

    useEffect(() => {
        if (!containerRef.current || !scrollContainerRef.current) return;

        const container = containerRef.current;
        const scrollContainer = scrollContainerRef.current;

        const ctx = gsap.context(() => {
            const scrollWidth = scrollContainer.scrollWidth;
            const containerWidth = container.offsetWidth;

            gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${scrollWidth - containerWidth}`,
                    invalidateOnRefresh: true,
                }
            }).to(scrollContainer, {
                x: () => -(scrollWidth - containerWidth),
                ease: "none",
            });
        }, container);

        return () => ctx.revert();
    }, []);

    // Close modal on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
        };

        if (selectedImage) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    const handleCardClick = (item: GalleryItem) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div ref={containerRef} className="relative h-screen overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 items-center h-full px-12"
                    style={{ width: "max-content" }}
                >
                    {duplicatedItems.map((item, index) => (
                        <Card
                            key={`${item.text}-${index}`}
                            item={item}
                            onClick={() => handleCardClick(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    <div
                        className="relative max-w-[50vw] max-h-[60vh] aspect-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.image}
                            alt={selectedImage.text}
                            width={600}
                            height={800}
                            className="object-contain w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                            <h3 className="text-white text-lg md:text-xl font-bold">
                                {selectedImage.text}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const Card = ({ item, onClick }: { item: GalleryItem; onClick: () => void }) => {
    return (
        <div className="group flex-shrink-0 cursor-pointer">
            {/* Image Container */}
            <div
                onClick={onClick}
                className="relative w-[200px] h-[300px] md:w-[220px] md:h-[330px] overflow-hidden"
            >
                <Image
                    src={item.image}
                    alt={item.text}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 200px, 220px"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Title - Always visible outside card */}
            <div className="mt-3">
                <h3 className="text-white/70 font-medium text-sm md:text-base tracking-wide">
                    {item.text}
                </h3>
            </div>
        </div>
    );
};
