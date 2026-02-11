"use client";

import {
    TypeEffect,
    BlurText,
    SplitText,
    ShuffleText,
    TextPressure,
    DecryptText,
    ScrollFloat,
    ScrollReveal,
    GlitchText,
    WaveText
} from "./TextAnimations";

export default function TextAnimationsShowcase() {
    return (
        <section className="min-h-screen bg-black py-20 px-6">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-6xl font-black text-white mb-4">
                        <SplitText text="TEXT ANIMATIONS" />
                    </h1>
                    <p className="text-white/60">
                        <BlurText text="Inspired by reactbits.dev" delay={0.5} />
                    </p>
                </div>

                {/* 1. Type Effect */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">01. Type Effect</h2>
                        <div className="text-4xl font-black text-white">
                            <TypeEffect text="Hello, I'm a typing animation!" speed={80} />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 2. Blur Text */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">02. Blur Text</h2>
                        <div className="text-4xl font-black text-white">
                            <BlurText text="Text fades in from blur" />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 3. Split Text */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">03. Split Text</h2>
                        <div className="text-4xl font-black text-white">
                            <SplitText text="Character by character reveal" staggerDelay={0.05} />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 4. Shuffle Text */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">04. Shuffle Text</h2>
                        <div className="text-4xl font-black text-white">
                            <ShuffleText text="SHUFFLING CHARACTERS" />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 5. Text Pressure */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">05. Text Pressure</h2>
                        <div className="text-4xl font-black text-white">
                            <TextPressure text="Hover or click me!" />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 6. Decrypt Text */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">06. Decrypt Text</h2>
                        <div className="text-4xl font-black text-white">
                            <DecryptText text="DECRYPTING MESSAGE..." />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 7. Scroll Float */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">07. Scroll Float</h2>
                        <ScrollFloat>
                            <div className="text-4xl font-black text-white">
                                Floating animation
                            </div>
                        </ScrollFloat>
                    </div>
                </ScrollReveal>

                {/* 8. Glitch Text */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">08. Glitch Text</h2>
                        <div className="text-4xl font-black text-white">
                            <GlitchText text="GLITCH EFFECT" />
                        </div>
                    </div>
                </ScrollReveal>

                {/* 9. Wave Text */}
                <ScrollReveal>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/40 uppercase tracking-wider">09. Wave Text</h2>
                        <div className="text-4xl font-black text-white">
                            <WaveText text="WAVE MOTION" />
                        </div>
                    </div>
                </ScrollReveal>

                {/* Multiple Directions */}
                <div className="grid grid-cols-2 gap-8">
                    <ScrollReveal direction="left">
                        <div className="bg-white/5 p-8 rounded-2xl">
                            <p className="text-white text-xl">From Left</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="right">
                        <div className="bg-white/5 p-8 rounded-2xl">
                            <p className="text-white text-xl">From Right</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="up">
                        <div className="bg-white/5 p-8 rounded-2xl">
                            <p className="text-white text-xl">From Bottom</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="down">
                        <div className="bg-white/5 p-8 rounded-2xl">
                            <p className="text-white text-xl">From Top</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
