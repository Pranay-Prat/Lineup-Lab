'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { LoaderCircle } from 'lucide-react';

const Signin = () => {
  const { user, isLoaded } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  if (!isLoaded) {
    return (
      <LoaderCircle className="animate-spin h-6 w-6 text-muted-foreground" />
    );
  }

  if (user) {
    return (
      <div className="relative">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName || 'User profile image'}
              width={36}
              height={36}
              className="rounded-full"
              style={{ boxShadow: 'none', background: 'none' }}
            />
          ) : (
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold text-foreground bg-transparent">
              {user.emailAddresses?.[0]?.emailAddress?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </motion.div>
        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-muted text-foreground font-medium rounded-t-lg"
              onClick={() => { openUserProfile(); setMenuOpen(false); }}
            >
              Update Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-muted text-foreground font-medium"
              onClick={() => { window.location.href = '/lineups/all'; setMenuOpen(false); }}
            >
              Saved Lineups
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-destructive/10 text-destructive font-medium rounded-b-lg"
              onClick={() => { signOut(); setMenuOpen(false); }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <SignInButton>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
      >
        Sign In
      </motion.button>
    </SignInButton>
  );
};

export default Signin;
