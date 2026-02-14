"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Heart } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Pranay-Prat",
    icon: Github,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/PranayPrat",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pranay-pratap15",
    icon: Linkedin,
  },
]

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur-sm">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Main footer content */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Brand + tagline */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-xl font-bold text-foreground tracking-tight"
            >
              LineupLab
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Create stunning football lineups, share your tactical
              masterpieces, and showcase your football IQ.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start md:items-center space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.div key={social.name} whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-all duration-200"
                    >
                      <social.icon />
                    </Link>
                  </motion.div>
                ))}
              </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Lineup Lab. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </motion.span>
            by{" "}
            <Link
              href="https://github.com/Pranay-Prat"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline underline-offset-2"
            >
              Pranay Pratap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
