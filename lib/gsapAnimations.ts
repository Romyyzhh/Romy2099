import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

/**
 * GSAP Utility Functions untuk Portfolio
 * 
 * File ini berisi helper functions untuk animasi GSAP yang sering digunakan
 */

// ============================================
// TEXT ANIMATIONS
// ============================================

/**
 * Reveal text dengan split character animation
 * Cocok untuk: Hero titles, headings
 */
export const revealText = (element: string | Element, options = {}) => {
    const defaults = {
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0,
    };

    const settings = { ...defaults, ...options };

    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 100,
            rotateX: -90,
        },
        {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: settings.duration,
            stagger: settings.stagger,
            ease: settings.ease,
            delay: settings.delay,
        }
    );
};

/**
 * Typing effect animation
 * Cocok untuk: Subtitles, descriptions
 */
export const typeText = (element: string | Element, text: string) => {
    return gsap.to(element, {
        duration: 2,
        text: text,
        ease: 'none',
    });
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Parallax effect untuk background elements
 * Cocok untuk: Hero backgrounds, decorative elements
 */
export const parallaxScroll = (element: string | Element, speed = 0.5) => {
    return gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });
};

/**
 * Fade in on scroll dengan stagger
 * Cocok untuk: Project cards, list items
 */
export const fadeInStaggerScroll = (
    elements: string | Element | Element[],
    options = {}
) => {
    const defaults = {
        duration: 0.8,
        stagger: 0.2,
        y: 60,
        opacity: 0,
    };

    const settings = { ...defaults, ...options };

    return gsap.fromTo(
        elements,
        {
            opacity: settings.opacity,
            y: settings.y,
        },
        {
            opacity: 1,
            y: 0,
            duration: settings.duration,
            stagger: settings.stagger,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: elements,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

/**
 * Image reveal dengan clip-path
 * Cocok untuk: Project images, gallery
 */
export const imageRevealScroll = (element: string | Element) => {
    return gsap.fromTo(
        element,
        {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        },
        {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: element,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// ============================================
// TIMELINE ANIMATIONS
// ============================================

/**
 * Create timeline untuk sequence animations
 * Cocok untuk: Complex sequential animations
 */
export const createTimeline = (options = {}) => {
    return gsap.timeline(options);
};

/**
 * Experience card reveal timeline
 * Cocok untuk: Experience section
 */
export const experienceCardTimeline = (card: string | Element) => {
    // Handle both string selector and Element
    let cardElement: Element | null;
    if (typeof card === 'string') {
        cardElement = document.querySelector(card);
    } else {
        cardElement = card;
    }

    if (!cardElement) return gsap.timeline();

    // Query children relative to the card element
    const header = cardElement.querySelector('.exp-header');
    const descriptions = cardElement.querySelectorAll('.exp-description');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: cardElement,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
        },
    });

    tl.fromTo(
        cardElement,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );

    if (header) {
        tl.fromTo(
            header,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4 },
            '-=0.3'
        );
    }

    if (descriptions.length > 0) {
        tl.fromTo(
            descriptions,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            '-=0.2'
        );
    }

    return tl;
};

// ============================================
// CONTINUOUS ANIMATIONS
// ============================================

/**
 * Floating animation (loop)
 * Cocok untuk: Ship animation, floating elements
 */
export const floatingAnimation = (element: string | Element, options = {}) => {
    const defaults = {
        duration: 3,
        y: 20,
        ease: 'sine.inOut',
    };

    const settings = { ...defaults, ...options };

    return gsap.to(element, {
        y: settings.y,
        duration: settings.duration,
        ease: settings.ease,
        repeat: -1,
        yoyo: true,
    });
};

/**
 * Wave animation (loop)
 * Cocok untuk: Footer waves, decorative elements
 */
export const waveAnimation = (element: string | Element) => {
    return gsap.to(element, {
        x: -100,
        duration: 10,
        ease: 'none',
        repeat: -1,
    });
};

/**
 * Rotating glow effect
 * Cocok untuk: Decorative glows, accent elements
 */
export const rotatingGlow = (element: string | Element) => {
    return gsap.to(element, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
    });
};

// ============================================
// HOVER ANIMATIONS
// ============================================

/**
 * Scale and glow on hover
 * Cocok untuk: Buttons, cards
 */
export const hoverScale = (element: Element) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
        scale: 1.05,
        boxShadow: '0 10px 40px rgba(157, 78, 221, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
    });

    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());

    return tl;
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

/**
 * Navbar background change on scroll
 * Cocok untuk: Fixed navbar
 */
export const navbarScrollEffect = (navbar: string | Element) => {
    return ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: navbar,
        },
    });
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Kill all ScrollTriggers - useful for cleanup
 */
export const killAllScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Refresh ScrollTriggers - useful after layout changes
 */
export const refreshScrollTriggers = () => {
    ScrollTrigger.refresh();
};

/**
 * Custom ease functions
 */
export const customEases = {
    smooth: 'power2.inOut',
    bounce: 'elastic.out(1, 0.3)',
    snap: 'back.out(1.7)',
};
