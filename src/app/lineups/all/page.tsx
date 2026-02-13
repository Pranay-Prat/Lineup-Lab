"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Users, Calendar, Plus, Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import BallLoader from "@/components/ui/Loader";

type Lineup = {
  id: string;
  title: string;
  formationName: string | null;
  players: unknown;
  background: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AllLineupsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchLineups = async () => {
      try {
        const { data } = await axios.get("/api/lineups");
          setLineups(data.lineups);
      } catch (error) {
        console.error("Error fetching lineups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLineups();
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lineup?")) return;

    setDeletingId(id);
    try {
      const { status } = await axios.delete(`/api/lineups/${id}`);
      if (status === 200) {
        setLineups((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error("Error deleting lineup:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (authLoading || isLoading) {
    return <BallLoader />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                My Lineups
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {lineups.length} {lineups.length === 1 ? "lineup" : "lineups"} saved
              </p>
            </div>
          </div>
          <Link href="/lineup-builder?new=true">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Lineup</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Not logged in */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6 border border-border/30">
              <LogIn className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sign in to see your lineups
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Create an account or sign in to save and manage your football lineups.
            </p>
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Empty state */}
        {user && lineups.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-5xl mb-6">⚽</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No lineups yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Create your first lineup and it will show up here.
            </p>
            <Link href="/lineup-builder?new=true">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create Lineup
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Lineups Grid */}
        {user && lineups.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {lineups.map((lineup, index) => (
                <Link key={lineup.id} href={`/lineup-builder?load=${lineup.id}`} target="_blank">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-border hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {/* Mini pitch preview */}
                    <div className="relative h-36 bg-gradient-to-b from-green-600 to-green-700 overflow-hidden">
                      {/* Pitch markings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-white/20" />
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 border-2 border-t-0 border-white/20 rounded-b-lg" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 border-2 border-b-0 border-white/20 rounded-t-lg" />
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15" />

                      {/* Player dots */}
                      {Array.isArray(lineup.players) &&
                        (lineup.players as Array<{ x: number; y: number }>).slice(0, 11).map((p, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-white/80 shadow-sm"
                            style={{
                              left: `${p.x}%`,
                              top: `${p.y}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        ))}

                      {/* Delete button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(lineup.id);
                        }}
                        disabled={deletingId === lineup.id}
                        className="absolute top-2 right-2 p-1.5 bg-black/40 hover:bg-destructive/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                        title="Delete lineup"
                      >
                        {deletingId === lineup.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </motion.button>
                    </div>

                    {/* Card content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate mb-2">
                        {lineup.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        {lineup.formationName && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span>{lineup.formationName}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(lineup.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
