"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Layers } from "lucide-react";
import { PinContainer } from "@/components/ui/3d-pin";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />

            {/* Animated grid pattern - very subtle */}
            <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Floating accent circles - decorative */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                        Drag & drop lineup builder
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
                    Build the Perfect
                    <br />
                    <span className="relative">
                        <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
                            Football Lineup
                        </span>
                        <svg
                            className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                            viewBox="0 0 200 12"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M1 8.5C30 3 60 1 100 5.5C140 10 170 8 199 3.5"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                    Create, customize, and share your dream team with our intuitive
                    drag-and-drop lineup builder. Choose your formation and build the perfect squad.
                </p>

                {/* CTA Button - 3D Pixel Key Style with Motion */}
                <div className="flex justify-center mb-16">
                    <Link href="/lineup-builder" className="group">
                        <motion.div
                            className="relative cursor-pointer"
                            whileHover="hover"
                            whileTap="pressed"
                            initial="idle"
                        >
                            {/* 3D Base layer - visible bottom and right edges */}
                            {/* Light mode: black base, Dark mode: white base (inverted for contrast) */}
                            <div
                                className="absolute inset-[1px]"
                                style={{
                                    clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)'
                                }}
                            >
                                {/* Full background for depth - light for light mode, dark for dark mode */}
                                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900" />
                                {/* Right edge - slightly darker for 3D effect */}
                                <div className="absolute top-0 right-0 bottom-0 w-[8px] bg-gradient-to-l from-neutral-300 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
                                {/* Bottom edge - slightly darker for 3D effect */}
                                <div className="absolute left-0 right-0 bottom-0 h-[10px] bg-gradient-to-t from-neutral-300 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
                            </div>

                            {/* Main key surface */}
                            {/* Light mode: white surface, Dark mode: dark surface */}
                            <motion.div
                                className="relative"
                                style={{
                                    clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)'
                                }}
                                variants={{
                                    idle: { y: 0, x: 0 },
                                    hover: { y: 4, x: 3 },
                                    pressed: { y: 8, x: 6 }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 600,
                                    damping: 25
                                }}
                            >
                                {/* Key top surface */}
                                <div className="relative w-[280px] h-[70px] flex items-center justify-center bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-neutral-800">
                                    {/* Button text */}
                                    <span className="text-xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-widest select-none">
                                        Build
                                    </span>

                                    {/* Bottom inner shadow */}
                                    <div className="absolute left-4 bottom-2 right-4 h-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full opacity-50" />
                                </div>
                            </motion.div>

                            {/* Press hint */}
                            <motion.div
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                                variants={{
                                    idle: { opacity: 0.5, y: 0 },
                                    hover: { opacity: 1, y: 0 },
                                    pressed: { opacity: 0, y: 4 }
                                }}
                            >
                                <span>Press to start</span>
                                <ArrowRight className="w-3 h-3" />
                            </motion.div>
                        </motion.div>
                    </Link>
                </div>

                {/* Feature highlights */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted">
                            <Users className="w-4 h-4" />
                        </div>
                        <span>Custom Lineups</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted">
                            <Layers className="w-4 h-4" />
                        </div>
                        <span>Multiple Formations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span>Easy to Use</span>
                    </div>
                </div>

                {/* Visual preview mockup - Mobile static version */}
                <div className="mt-12 md:hidden">
                    <a href="/lineup-builder" className="block">
                        <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-2 shadow-xl">
                            {/* Mini pitch preview */}
                            <div className="relative aspect-[4/3] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden">
                                {/* Pitch markings */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full border-2 border-white/30" />
                                </div>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-10 border-2 border-t-0 border-white/30 rounded-b-lg" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-10 border-2 border-b-0 border-white/30 rounded-t-lg" />
                                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/20" />

                                {/* Player positions - simplified for mobile */}
                                <div className="absolute inset-0 p-2">
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white/90 shadow-md" />
                                    <div className="absolute bottom-10 left-[20%] w-4 h-4 rounded-full bg-white/70 shadow-sm" />
                                    <div className="absolute bottom-10 right-[20%] w-4 h-4 rounded-full bg-white/70 shadow-sm" />
                                    <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-4 h-4 rounded-full bg-white/60 shadow-sm" />
                                    <div className="absolute top-1/2 -translate-y-1/2 right-[25%] w-4 h-4 rounded-full bg-white/60 shadow-sm" />
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white/70 shadow-sm" />
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">Tap to start building →</p>
                    </a>
                </div>

                {/* Visual preview mockup with 3D Pin animation - Desktop only */}
                <div className="hidden md:flex mt-16 h-[28rem] items-center justify-center">
                    <PinContainer
                        title="Try the Lineup Builder"
                        href="/lineup-builder"
                        containerClassName="w-full max-w-3xl"
                    >
                        <div className="w-[40rem]">
                            <div className="rounded-2xl border border-border/30 bg-card p-2 shadow-2xl">
                                {/* Browser-style header */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="flex-1 mx-4">
                                        <div className="bg-muted rounded-lg h-8 w-full max-w-md mx-auto flex items-center justify-center">
                                            <span className="text-xs text-muted-foreground">lineuplab.app/lineup-builder</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mini pitch preview */}
                                <div className="relative aspect-[4/3] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden">
                                    {/* Pitch markings */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 rounded-full border-2 border-white/30" />
                                    </div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 border-2 border-t-0 border-white/30 rounded-b-lg" />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 border-2 border-b-0 border-white/30 rounded-t-lg" />
                                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/20" />

                                    {/* Sample player positions - 4-3-3 formation */}
                                    <div className="absolute inset-0 p-4">
                                        {/* GK */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/90 border-2 border-white shadow-lg" />

                                        {/* Defense line */}
                                        <div className="absolute bottom-20 left-[15%] w-7 h-7 rounded-full bg-white/80 border-2 border-white/80 shadow-md" />
                                        <div className="absolute bottom-20 left-[38%] w-7 h-7 rounded-full bg-white/80 border-2 border-white/80 shadow-md" />
                                        <div className="absolute bottom-20 right-[38%] w-7 h-7 rounded-full bg-white/80 border-2 border-white/80 shadow-md" />
                                        <div className="absolute bottom-20 right-[15%] w-7 h-7 rounded-full bg-white/80 border-2 border-white/80 shadow-md" />

                                        {/* Midfield */}
                                        <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-7 h-7 rounded-full bg-white/70 border-2 border-white/60 shadow-md" />
                                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white/70 border-2 border-white/60 shadow-md" />
                                        <div className="absolute top-1/2 -translate-y-1/2 right-[20%] w-7 h-7 rounded-full bg-white/70 border-2 border-white/60 shadow-md" />

                                        {/* Attack */}
                                        <div className="absolute top-8 left-[20%] w-7 h-7 rounded-full bg-white/60 border-2 border-white/50 shadow-md" />
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/70 border-2 border-white/60 shadow-lg" />
                                        <div className="absolute top-8 right-[20%] w-7 h-7 rounded-full bg-white/60 border-2 border-white/50 shadow-md" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PinContainer>
                </div>
            </div>
        </section>
    );
}
