"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

// Skeleton placeholder
const SectionSkeleton = ({ height = "min-h-screen" }: { height?: string }) => (
    <div className={`${height} bg-black w-full`} />
);

// Lazy load below-the-fold heavy components (ssr: false prevents them from blocking SSR)
const Experience = dynamic(() => import("@/components/Experience"), {
    loading: () => <SectionSkeleton />,
    ssr: false,
});

const Projects = dynamic(() => import("@/components/Projects"), {
    loading: () => <SectionSkeleton />,
    ssr: false,
});

const Contact = dynamic(() => import("@/components/Contact"), {
    loading: () => <SectionSkeleton />,
    ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <SectionSkeleton height="h-32" />,
    ssr: false,
});

/** Renders a component only once it enters the viewport */
function LazySection({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px 0px" } // Start loading 200px before it enters viewport
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} id={id} className={className}>
            {visible ? children : <SectionSkeleton />}
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <LazySection>
                <Suspense fallback={<SectionSkeleton />}>
                    <Experience />
                </Suspense>
            </LazySection>
            <LazySection>
                <Suspense fallback={<SectionSkeleton />}>
                    <Projects />
                </Suspense>
            </LazySection>
            <LazySection>
                <Suspense fallback={<SectionSkeleton />}>
                    <Contact />
                </Suspense>
            </LazySection>
            <LazySection>
                <Suspense fallback={<SectionSkeleton height="h-32" />}>
                    <Footer />
                </Suspense>
            </LazySection>
        </main>
    );
}
