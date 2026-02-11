import React from 'react';
import { ScrollReveal } from './ui/TextAnimations';

const AboutDescription = () => {
    return (
        <div className="w-full max-w-7xl mx-auto mt-32 px-6 md:px-0 text-white relative">
            {/* Top Divider */}
            <ScrollReveal direction="left" className="w-full">
                <div className="w-full h-[1px] bg-white/20 mb-12"></div>
            </ScrollReveal>

            {/* Intro Section */}
            <div className="mb-24">
                <ScrollReveal direction="up">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-12 flex items-center gap-4">
                        Let me introduce myself <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Side - Text Content */}
                    <ScrollReveal direction="up">
                        <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                Hello! I&apos;m Muhammad Alvin Karomy, a passionate Informatics Engineering student at Universitas Islam Nahdlatul Ulama Jepara. I am a student with a strong focus on graphic & visual design, particularly photo editing, and frontend development. 
                            </p>
                            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                I have experience in photo retouching, image manipulation, and color correction to produce high-quality visuals, as well as implementing them into responsive and user-friendly web interfaces.
                            </p>
                            <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                                I&apos;m committed to continuous learning and professional growth in design and frontend development.. I am open to new opportunities and collaborations! 🚀
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Right Side - Tools */}
                    <div className="space-y-10">
                        {/* Frontend Tools */}
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-6">Frontend Tools</h4>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                                    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                                    { name: "Framer", src: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
                                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                                    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },

                                    { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },

                                    { name: "GSAP", src: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" },
                                ].map((tool) => (
                                    <div key={tool.name} className="group relative flex flex-col items-center gap-2">
                                        <div className="w-14 h-14 relative transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:scale-110">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={tool.src}
                                                alt={tool.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Backend Tools */}
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-6">Backend Tools</h4>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
                                    { name: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
                                    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                                    { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                                ].map((tool) => (
                                    <div key={tool.name} className="group relative flex flex-col items-center gap-2">
                                        <div className="w-14 h-14 relative transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:scale-110">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={tool.src}
                                                alt={tool.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Design Tools */}
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-6">Design Tools</h4>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { name: "Photoshop", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
                                    { name: "Lightroom", src: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg" },
                                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                                    { name: "Canva", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },

                                ].map((tool) => (
                                    <div key={tool.name} className="group relative flex flex-col items-center gap-2">
                                        <div className="w-14 h-14 relative transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:scale-110">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={tool.src}
                                                alt={tool.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Section - Experience */}
            <div className="mb-20">
                <ScrollReveal direction="up">
                    <h3 className="text-3xl font-bold mb-12">Experience</h3>
                </ScrollReveal>
                <div className="relative border-l border-white/20 ml-3 md:ml-0 space-y-16">

                    {/* Experience Item 1 */}
                    <ScrollReveal direction="right" className="relative pl-12 md:pl-0 grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-0 md:gap-12">
                        {/* Date (Left) */}
                        <div className="hidden md:block text-right text-xl font-bold text-white/50 pt-1">
                            <div>2025</div>
                            <div>Present</div>
                        </div>

                        {/* Dot (Middle) */}
                        <div className="absolute left-[-5px] md:relative md:left-auto w-3 h-3 bg-white rounded-full mt-2.5 md:mt-2.5 md:-ml-[6.5px] shadow-[0_0_0_8px_rgba(0,0,0,1)]"></div>

                        {/* Content (Right) */}
                        <div>
                            <div className="md:hidden text-sm font-bold text-white/50 mb-2">2023 - Present</div>
                            <h4 className="text-2xl font-bold text-white mb-2">Coordinator of Kominfo Division at BEM FST</h4>
                            <p className="text-lg text-white/60 mb-4">Kominfo Division – Social Media Editing & Digital Content</p>
                            <ul className="list-disc list-outside ml-5 space-y-2 text-white/70 leading-relaxed">
                                <li>Managed social media strategies and content creation for the faculty student executive board.</li>
                                <li>Designed visual assets and edited videos to enhance digital engagement.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Experience Item 2 */}
                    <ScrollReveal direction="right" className="relative pl-12 md:pl-0 grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-0 md:gap-12">
                        <div className="hidden md:block text-right text-xl font-bold text-white/50 pt-1">
                            <div>2023</div>
                            <div>2025</div>
                        </div>
                        <div className="absolute left-[-5px] md:relative md:left-auto w-3 h-3 bg-white rounded-full mt-2.5 md:mt-2.5 md:-ml-[6.5px] shadow-[0_0_0_8px_rgba(0,0,0,1)]"></div>
                        <div>
                            <div className="md:hidden text-sm font-bold text-white/50 mb-2">2023 - Present</div>
                            <h4 className="text-2xl font-bold text-white mb-2">Member of HMPSIF</h4>
                            <p className="text-lg text-white/60 mb-4">Kominfo Division – Social Media Editing & Digital Content</p>
                            <ul className="list-disc list-outside ml-5 space-y-2 text-white/70 leading-relaxed">
                                <li>Collaborated with the team to produce creative content for the Informatics Engineering student association.</li>
                                <li>Supported event documentation and publication.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                </div>
            </div>

            {/* Timeline Section - Education */}
            <div className="mb-20">
                <ScrollReveal direction="up">
                    <h3 className="text-3xl font-bold mb-12">Education</h3>
                </ScrollReveal>
                <div className="relative border-l border-white/20 ml-3 md:ml-0 space-y-16">

                    {/* Edu Item 1 */}
                    <ScrollReveal direction="right" className="relative pl-12 md:pl-0 grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-0 md:gap-12">
                        <div className="hidden md:block text-right text-xl font-bold text-white/50 pt-1">
                            <div>2023</div>
                            <div>Present</div>
                        </div>
                        <div className="absolute left-[-5px] md:relative md:left-auto w-3 h-3 bg-white rounded-full mt-2.5 md:mt-2.5 md:-ml-[6.5px] shadow-[0_0_0_8px_rgba(0,0,0,1)]"></div>
                        <div>
                            <div className="md:hidden text-sm font-bold text-white/50 mb-2">2023 - Present</div>
                            <h4 className="text-2xl font-bold text-white mb-1">Universitas Nahdlatul Ulama Jepara</h4>
                            <p className="text-white/60">Still studying...</p>
                        </div>
                    </ScrollReveal>

                    {/* Edu Item 2 */}
                    <ScrollReveal direction="right" className="relative pl-12 md:pl-0 grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-0 md:gap-12">
                        <div className="hidden md:block text-right text-xl font-bold text-white/50 pt-1">
                            <div>2020</div>
                            <div>2023</div>
                        </div>
                        <div className="absolute left-[-5px] md:relative md:left-auto w-3 h-3 bg-white rounded-full mt-2.5 md:mt-2.5 md:-ml-[6.5px] shadow-[0_0_0_8px_rgba(0,0,0,1)]"></div>
                        <div>
                            <div className="md:hidden text-sm font-bold text-white/50 mb-2">2020 - 2023</div>
                            <h4 className="text-2xl font-bold text-white mb-1">SMKN 1 Jepara</h4>
                            <p className="text-white/60">Vocational High School</p>
                              <p className="text-white/60">Network and Computer Engineering</p>
                        </div>
                    </ScrollReveal>

                    {/* Edu Item 3 */}
                    <ScrollReveal direction="right" className="relative pl-12 md:pl-0 grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-0 md:gap-12">
                        <div className="hidden md:block text-right text-xl font-bold text-white/50 pt-1">
                            <div>2017</div>
                            <div>2019</div>
                        </div>
                        <div className="absolute left-[-5px] md:relative md:left-auto w-3 h-3 bg-white rounded-full mt-2.5 md:mt-2.5 md:-ml-[6.5px] shadow-[0_0_0_8px_rgba(0,0,0,1)]"></div>
                        <div>
                            <div className="md:hidden text-sm font-bold text-white/50 mb-2">2017 - 2019</div>
                            <h4 className="text-2xl font-bold text-white mb-1">SMPN 2 Panggang Jepara</h4>
                            <p className="text-white/60">Junior High School</p>
                        </div>
                    </ScrollReveal>

                </div>
            </div>



            {/* Bottom Divider */}
            <ScrollReveal direction="left" className="w-full">
                <div className="w-full h-[1px] bg-white/20 mt-12"></div>
            </ScrollReveal>

            {/* Footer Tag */}
            <ScrollReveal direction="up">
                <div className="mt-12 flex justify-end items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                    <span>{'//////////////////////'}</span>
                    <span>ROMY_GRAPHIC</span>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default AboutDescription;
