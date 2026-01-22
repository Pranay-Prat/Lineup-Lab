"use client";

import { MousePointer2, Palette, Share2, Zap } from "lucide-react";

const features = [
    {
        icon: MousePointer2,
        title: "Drag & Drop Builder",
        description: "Intuitively place players on the pitch with our smooth drag-and-drop interface. Move, swap, and arrange your lineup effortlessly."
    },
    {
        icon: Palette,
        title: "Custom Formations",
        description: "Choose from popular formations like 4-3-3, 4-4-2, 3-5-2 and more. Adapt your tactics to any match situation."
    },
    {
        icon: Share2,
        title: "Share & Export",
        description: "Save your lineups and share them with friends, teammates, or on social media. Export as images with one click."
    },
    {
        icon: Zap,
        title: "Quick & Easy",
        description: "No sign-up required to start building. Jump straight into creating your dream lineup in seconds."
    }
];

export default function AboutSection() {
    return (
        <section id="about" className="relative py-24 bg-muted/30 overflow-hidden">
            {/* Subtle top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
                        Create lineups your way
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        LineupLab is your go-to tool for building, visualizing, and sharing football lineups.
                        Whether you're a coach, analyst, or passionate fan, we make tactics accessible to everyone.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group relative p-6 lg:p-8 bg-card rounded-2xl border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Icon container */}
                            <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-foreground" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Subtle hover accent */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
