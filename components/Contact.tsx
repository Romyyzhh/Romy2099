"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle, XCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurTextComponent";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-reveal", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                force3D: true,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            // Using Web3Forms - Free email service
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "130a027e-7df8-4b1c-8718-1b7930bceeec", // User needs to replace this
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    message: formData.message,
                    subject: "New Contact Form Submission from Portfolio",
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                throw new Error(result.message || "Something went wrong");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <section ref={sectionRef} id="contact" className="relative bg-black py-24 px-6 md:px-12 overflow-hidden">

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Content */}
                    <div className="space-y-6 pt-10">


                        <h2 className="contact-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter break-words">
                            <BlurText
                                text="LET'S WORK TOGETHER"
                                delay={50}
                                animateBy="words"
                                direction="top"
                            />
                        </h2>

                        <p className="contact-reveal text-gray-400 text-lg max-w-md mt-8 leading-relaxed">
                            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something great together!
                        </p>

                        {/* Contact Info */}
                        <div className="contact-reveal space-y-4 pt-8">
                            <div>
                                <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Email</p>
                                <a href="mailto:muhammadalvinkaromy@gmail.com" className="text-white hover:text-gray-300 transition-colors">
                                    muhammadalvinkaromy@gmail.com
                                </a>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Location</p>
                                <p className="text-white">Indonesia</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Form */}
                    <div className="contact-reveal relative w-full max-w-md ml-auto">
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-gray-400 text-sm font-medium">First name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                                            placeholder="Romy"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-gray-400 text-sm font-medium">Last name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                                            placeholder="Exp"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-gray-400 text-sm font-medium">Email address </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                                        placeholder="themanofsolo@gmail.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-gray-400 text-sm font-medium">Message </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>

                                {/* Status Messages */}
                                {status === "success" && (
                                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
                                        <CheckCircle size={20} />
                                        <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                                        <XCircle size={20} />
                                        <span>{errorMessage || "Failed to send message. Please try again."}</span>
                                    </div>
                                )}

                                <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <p className="text-xs text-gray-500 max-w-[250px]">
                                        By submitting you agree to receive emails from me regarding your inquiry.
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? "SENDING..." : "SUBMIT"}
                                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
