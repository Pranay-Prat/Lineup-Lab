"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

/**
 * Reusable animated page header component
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    className = ""
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-center mb-4 ${className}`}
        >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-6 leading-relaxed bg-background/50 backdrop-blur-sm p-2 rounded-lg inline-block">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default PageHeader;
