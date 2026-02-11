"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

// 1. Type Effect - Using react-type-animation
export const TypeEffect = ({
    text,
    className = "",
    speed = 50
}: {
    text: string;
    className?: string;
    speed?: number
}) => {
    return (
        <TypeAnimation
            sequence={[text]}
            wrapper="span"
            speed={speed as any}
            className={className}
            cursor={false}
        />
    );
};

// 2. Blur Text - Improved with better timing
export const BlurText = ({
    text,
    className = "",
    delay = 0
}: {
    text: string;
    className?: string;
    delay?: number
}) => {
    return (
        <motion.span
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.2, delay, ease: "easeOut" }}
            className={className}
        >
            {text}
        </motion.span>
    );
};

// 3. Split Text - Character by character with better stagger
export const SplitText = ({
    text,
    className = "",
    staggerDelay = 0.03
}: {
    text: string;
    className?: string;
    staggerDelay?: number
}) => {
    const characters = text.split("");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: staggerDelay, delayChildren: 0 * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.span
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: "inline-block" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// 4. Shuffle Text - COMPLETELY DIFFERENT from Decrypt
export const ShuffleText = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [isShuffling, setIsShuffling] = useState(true);

    useEffect(() => {
        let iteration = 0;
        const maxIterations = text.length;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setIsShuffling(false);
            }

            iteration += 0.5;
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className={`${className} ${isShuffling ? 'animate-pulse' : ''}`}>
            {displayText}
        </span>
    );
};

// 5. Text Pressure - Scale with spring animation
export const TextPressure = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    return (
        <motion.span
            whileHover={{ scale: 1.1, color: "#9D4EDD" }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`${className} cursor-pointer inline-block`}
        >
            {text}
        </motion.span>
    );
};

// 6. Decrypt Text - COMPLETELY DIFFERENT from Shuffle
export const DecryptText = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    const [decrypted, setDecrypted] = useState("");
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        let frame = 0;
        const totalFrames = text.length * 3;

        const interval = setInterval(() => {
            setDecrypted(
                text
                    .split("")
                    .map((char, index) => {
                        // Decrypt from left to right
                        if (frame > index * 3) {
                            return char;
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            frame++;

            if (frame > totalFrames) {
                clearInterval(interval);
                setDecrypted(text);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className={`${className} font-mono`}>
            {decrypted}
        </span>
    );
};

// 7. Scroll Float - Continuous floating
export const ScrollFloat = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string
}) => {
    return (
        <motion.div
            animate={{
                y: [0, -15, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 8. Scroll Reveal - Multiple directions
export const ScrollReveal = ({
    children,
    className = "",
    direction = "up"
}: {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right"
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 9. Glitch Text - Cyberpunk style
export const GlitchText = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    return (
        <motion.span
            className={`${className} relative inline-block`}
            animate={{
                x: [0, -3, 3, -3, 3, 0],
            }}
            transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
            }}
            style={{
                textShadow: "2px 2px 0 #ff00ff, -2px -2px 0 #00ffff"
            }}
        >
            {text}
        </motion.span>
    );
};

// 10. Wave Text - Each character waves
export const WaveText = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    const characters = text.split("");

    return (
        <span className={className}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: index * 0.1,
                        ease: "easeInOut"
                    }}
                    style={{ display: "inline-block" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

// 11. Fade In Up - Simple but effective
export const FadeInUp = ({
    children,
    className = "",
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 12. Rotate In - Text rotates in
export const RotateIn = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    return (
        <motion.span
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
            style={{ display: "inline-block", transformOrigin: "center" }}
        >
            {text}
        </motion.span>
    );
};
// 13. Hover Binary Decrypt - Scramble with 0s and 1s on hover
export const HoverBinaryDecrypt = ({
    text,
    className = ""
}: {
    text: string;
    className?: string
}) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "01"; // Binary characters
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;
        const maxIterations = text.length;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
            }

            iteration += 1 / 3; // Slower iteration for better effect
        }, 30);
    };

    const reset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <span
            className={`${className} inline-block`}
            onMouseEnter={scramble}
            onMouseLeave={reset}
        >
            {displayText}
        </span>
    );
};
