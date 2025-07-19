'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import  ballImage from '@/assets/Ball_Loader.png'
export default function BallLoader() {
  return (
    <div className="flex items-center justify-center h-48 min-h-screen bg-background text-foreground">
    <motion.div
      className="w-12 h-12"
      animate={{
        y: ['0%', '-40%', '0%'], 
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Image
        src={ballImage}
        alt="Bouncing Ball"
        width={64}
        height={64}
        className="object-contain"
        style={{
        animation: 'spin 1s linear infinite',
        }}
      />
    </motion.div>
    </div>
  )
}
