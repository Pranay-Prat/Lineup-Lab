'use client';

import { useState } from 'react';
import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu, NavbarButton } from '@/components/ui/resizable-navbar' // adjust import
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { name: 'Lineups', link: '/lineups' },
  { name: 'Build', link: '/build' },
  { name: 'Features', link: '/features' }
];

export default function MainNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Nav */}
      <NavBody>
        {/* Left Side Title */}
        <div className="flex items-center space-x-4">
          <a href="/" className="text-lg font-bold text-black dark:text-white">Lineup Builder</a>
        </div>

        {/* Center Nav Items */}
        <NavItems items={navLinks} />

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NavbarButton href="/login">Login</NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Nav */}
      <MobileNav>
        <MobileNavHeader>
          <a href="/" className="text-lg font-bold text-black dark:text-white">Lineup Builder</a>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-md w-full rounded-md px-2 py-2 font-medium text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="mt-4 flex w-full items-center justify-between">
            <ThemeToggle />
            <NavbarButton href="/login" className="ml-2">Login</NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
