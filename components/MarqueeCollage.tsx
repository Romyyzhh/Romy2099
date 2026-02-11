"use client";

import Image from "next/image";

interface MarqueeItem {
    image: string;
    text: string;
}

interface MarqueeCollageProps {
    items: MarqueeItem[];
}

export default function MarqueeCollage({ items }: MarqueeCollageProps) {
    // Split items into two distinct arrays
    const midPoint = Math.ceil(items.length / 2);
    const firstHalf = items.slice(0, midPoint);
    const secondHalf = items.slice(midPoint);

    // Duplicate each half enough times to ensure smooth marquee
    const row1Items = [...firstHalf, ...firstHalf, ...firstHalf, ...firstHalf];
    const row2Items = [...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf];

    return (
        <div className="flex flex-col gap-4 overflow-hidden w-full select-none py-8">
            {/* Row 1 - Left to Right */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-marquee gap-4 pause-on-hover px-4">
                    {row1Items.map((item, index) => (
                        <Card key={`row1-${index}`} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Row 2 - Right to Left */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-marquee-reverse gap-4 pause-on-hover px-4">
                    {row2Items.map((item, index) => (
                        <Card key={`row2-${index}`} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Fade gradients on sides */}
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}

const Card = ({ item, index }: { item: MarqueeItem; index: number }) => {
    return (
        <div className="relative group w-[200px] h-[300px] md:w-[240px] md:h-[360px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300">
            <Image
                src={item.image}
                alt={item.text}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 200px, 240px"
            />

            {/* Simple Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-lg md:text-xl tracking-wide">
                    {item.text}
                </p>
                <div className="h-0.5 w-8 bg-white/50 mt-2"></div>
            </div>
        </div>
    );
};
