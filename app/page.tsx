import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

// Lazy load below-the-fold components for better performance
const Experience = dynamic(() => import("@/components/Experience"), {
    loading: () => <div className="h-screen bg-[#050505]" />,
});

const Projects = dynamic(() => import("@/components/Projects"), {
    loading: () => <div className="h-screen bg-[#050505]" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
    loading: () => <div className="min-h-screen bg-[#050505]" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <div className="bg-[#050505]" />,
});

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
            <Footer />
        </main>
    );
}
