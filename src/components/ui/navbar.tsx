"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut, Github } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"
import { useAuth } from "@/context/AuthProvider"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    { name: "About", href: "/#about", type: "link" },
    { name: "Lineups", href: "/lineups/all", type: "link" }
  ]

  return (
    <>
      <div className="h-20" />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2, ease: "easeIn" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
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

            {/* Right - Theme Toggle + Auth */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="https://github.com/Pranay-Prat/Lineup-Lab" target="_blank" className="relative group hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg"
                >
                  <Github className="w-5 h-5" />
                </motion.div>
                
                {/* Notification Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-lg pointer-events-none"
                >
                  Don&apos;t forget to star!
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </motion.div>
              </Link>
                <div className="h-6 w-px bg-border mx-2 hidden md:block"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg"
              >
                <ThemeToggle />
              </motion.div>

              {/* Auth Buttons */}
              {!isLoading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold uppercase">
                          {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "U")}
                        </div>
                        <span className="text-sm font-medium text-foreground max-w-[140px] truncate">
                          {user.user_metadata?.full_name || user.email}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSignOut}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-200 rounded-lg"
                        title="Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <Link href="/auth">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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
                    <span className="text-muted-foreground font-medium">Star on GitHub</span>
                    <Link href="https://github.com/Pranay-Prat/Lineup-Lab" target="_blank">
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        animate={{ 
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-border bg-card"
                      >
                        <Github className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Theme</span>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-border"
                    >
                      <ThemeToggle />
                    </motion.div>
                  </div>

                  {/* Mobile Auth */}
                  {!isLoading && (
                    <>
                      {user ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 px-3 py-2.5 bg-muted/50 rounded-lg border border-border/30">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold uppercase shrink-0">
                              {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "U")}
                            </div>
                            <span className="text-sm font-medium text-foreground truncate">
                              {user.user_metadata?.full_name || user.email}
                            </span>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </motion.button>
                        </div>
                      ) : (
                        <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
                          >
                            Sign In
                          </motion.div>
                        </Link>
                      )}
                    </>
                  )}
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