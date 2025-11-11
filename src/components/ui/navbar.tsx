"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"
import Signin from "./Sign-In"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#", type: "a" },
    { name: "Lineups", href: "/lineups/all", type: "link" },
    { name: "Build", href: "/lineup-builder", type: "link" },
  ]

  return (
    <>
      <div className="h-20" />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2, ease: "easeIn" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left - Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.type === "a" ? (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ y: -2 }}
                    className="text-muted-foreground text-sm md:text-lg hover:text-foreground transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href={item.href}
                      className="text-muted-foreground text-sm md:text-lg hover:text-foreground transition-colors duration-200 font-medium"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
                <Link href="/" className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                LineupLab
                </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="theme-toggle-placeholder">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg"
                >
                  <ThemeToggle/>
                </motion.div>
              </div>
                <Signin/>
            </div>
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  item.type === "a" ? (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      whileTap={{ scale: 0.95 }}
                      className="block text-foreground font-medium py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={item.name}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-foreground font-medium py-2 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                ))}

                <div className="pt-4 space-y-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Theme</span>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-border"
                    >
                      <ThemeToggle/>
                    </motion.div>
                  </div>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Signin/>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar