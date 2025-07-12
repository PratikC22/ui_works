'use client'

import { motion } from 'framer-motion'

export function FloatingBubbles() {
  return (
    <>
      {/* Floating particles */}
      <motion.div
        className='absolute top-20 left-10 w-2 h-2 bg-slate-400/40 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute top-40 right-20 w-3 h-3 bg-slate-500/30 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className='absolute bottom-32 left-1/4 w-1 h-1 bg-slate-600/40 rounded-full'
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className='absolute top-60 left-1/3 w-2 h-2 bg-slate-300/50 rounded-full'
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className='absolute top-80 right-1/3 w-1 h-1 bg-slate-500/60 rounded-full'
        animate={{
          y: [0, -35, 0],
          opacity: [0.2, 0.9, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
      <motion.div
        className='absolute top-32 left-1/2 w-3 h-3 bg-slate-400/30 rounded-full'
        animate={{
          y: [0, 30, 0],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      />
      <motion.div
        className='absolute bottom-40 right-10 w-2 h-2 bg-slate-600/40 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      />
      <motion.div
        className='absolute top-16 right-1/4 w-1 h-1 bg-slate-300/70 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />
      <motion.div
        className='absolute bottom-20 left-1/3 w-2 h-2 bg-slate-500/50 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />
      <motion.div
        className='absolute top-48 left-1/5 w-1 h-1 bg-slate-400/60 rounded-full'
        animate={{
          y: [0, 35, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      />
      <motion.div
        className='absolute top-24 left-1/6 w-1 h-1 bg-violet-400/40 dark:bg-violet-300/40 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className='absolute top-36 right-1/6 w-2 h-2 bg-orange-400/30 dark:bg-orange-300/30 rounded-full'
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.8,
        }}
      />
      <motion.div
        className='absolute top-72 left-1/4 w-1 h-1 bg-slate-400/50 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      />
      <motion.div
        className='absolute top-28 right-1/5 w-1 h-1 bg-slate-600/40 rounded-full'
        animate={{
          y: [0, 35, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.1,
        }}
      />
      <motion.div
        className='absolute bottom-28 left-1/6 w-2 h-2 bg-slate-300/60 rounded-full'
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4,
        }}
      />
      <motion.div
        className='absolute top-44 right-1/7 w-1 h-1 bg-slate-500/50 rounded-full'
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      />
      <motion.div
        className='absolute bottom-36 right-1/5 w-1 h-1 bg-slate-400/40 rounded-full'
        animate={{
          y: [0, -35, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.8,
        }}
      />
      <motion.div
        className='absolute top-52 left-1/8 w-2 h-2 bg-slate-600/30 rounded-full'
        animate={{
          y: [0, 30, 0],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.1,
        }}
      />
      <motion.div
        className='absolute top-64 right-1/8 w-1 h-1 bg-slate-300/70 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
      <motion.div
        className='absolute bottom-24 left-1/7 w-1 h-1 bg-slate-500/40 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.7,
        }}
      />
      <motion.div
        className='absolute top-88 left-1/3 w-2 h-2 bg-slate-400/50 rounded-full'
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.3,
        }}
      />
      <motion.div
        className='absolute top-12 right-1/3 w-1 h-1 bg-slate-600/60 rounded-full'
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      />
      <motion.div
        className='absolute bottom-48 left-1/4 w-1 h-1 bg-slate-300/40 rounded-full'
        animate={{
          y: [0, -35, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.9,
        }}
      />
      <motion.div
        className='absolute top-76 right-1/4 w-2 h-2 bg-slate-500/30 rounded-full'
        animate={{
          y: [0, 25, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />
      <motion.div
        className='absolute top-56 left-1/9 w-1 h-1 bg-slate-400/70 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.6,
        }}
      />
      <motion.div
        className='absolute bottom-12 right-1/6 w-1 h-1 bg-slate-600/50 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.3,
        }}
      />
      <motion.div
        className='absolute top-68 left-1/5 w-2 h-2 bg-slate-300/40 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      />
      <motion.div
        className='absolute top-96 right-1/5 w-1 h-1 bg-slate-500/60 rounded-full'
        animate={{
          y: [0, 35, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.0,
        }}
      />
      <motion.div
        className='absolute bottom-56 left-1/8 w-1 h-1 bg-slate-400/30 rounded-full'
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.6,
        }}
      />
      <motion.div
        className='absolute top-84 left-1/7 w-2 h-2 bg-slate-600/50 rounded-full'
        animate={{
          y: [0, 20, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className='absolute top-8 right-1/7 w-1 h-1 bg-slate-300/40 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.4,
        }}
      />
      <motion.div
        className='absolute bottom-64 left-1/9 w-1 h-1 bg-slate-500/70 rounded-full'
        animate={{
          y: [0, 25, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.0,
        }}
      />
      <motion.div
        className='absolute top-92 left-1/6 w-2 h-2 bg-slate-400/30 rounded-full'
        animate={{
          y: [0, -35, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      />
      <motion.div
        className='absolute bottom-8 right-1/8 w-1 h-1 bg-slate-600/40 rounded-full'
        animate={{
          y: [0, 30, 0],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.7,
        }}
      />
      <motion.div
        className='absolute top-100 left-1/4 w-1 h-1 bg-slate-300/50 rounded-full'
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
      <motion.div
        className='absolute bottom-72 left-1/5 w-2 h-2 bg-slate-500/60 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
      <motion.div
        className='absolute top-108 right-1/6 w-1 h-1 bg-slate-400/40 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.2,
        }}
      />
      <motion.div
        className='absolute bottom-80 left-1/7 w-1 h-1 bg-slate-600/30 rounded-full'
        animate={{
          y: [0, 35, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.8,
        }}
      />
      <motion.div
        className='absolute top-116 left-1/8 w-2 h-2 bg-slate-300/70 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      />
      <motion.div
        className='absolute bottom-88 right-1/9 w-1 h-1 bg-slate-500/50 rounded-full'
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.9,
        }}
      />
      <motion.div
        className='absolute top-124 left-1/5 w-1 h-1 bg-slate-400/40 rounded-full'
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />
      <motion.div
        className='absolute bottom-96 left-1/6 w-2 h-2 bg-slate-600/60 rounded-full'
        animate={{
          y: [0, 30, 0],
          x: [0, 35, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      />
      <motion.div
        className='absolute top-132 right-1/7 w-1 h-1 bg-slate-300/30 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      />
      <motion.div
        className='absolute bottom-104 left-1/8 w-1 h-1 bg-slate-500/40 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4,
        }}
      />
      <motion.div
        className='absolute top-140 left-1/9 w-2 h-2 bg-slate-400/70 rounded-full'
        animate={{
          y: [0, -35, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />
      <motion.div
        className='absolute bottom-112 right-1/5 w-1 h-1 bg-slate-600/50 rounded-full'
        animate={{
          y: [0, 20, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.1,
        }}
      />
      <motion.div
        className='absolute top-148 left-1/6 w-1 h-1 bg-slate-300/40 rounded-full'
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.7,
        }}
      />
      <motion.div
        className='absolute bottom-120 left-1/7 w-2 h-2 bg-slate-500/30 rounded-full'
        animate={{
          y: [0, 35, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      />
      <motion.div
        className='absolute top-156 right-1/8 w-1 h-1 bg-slate-400/60 rounded-full'
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.8,
        }}
      />
      <motion.div
        className='absolute bottom-128 left-1/9 w-1 h-1 bg-slate-600/40 rounded-full'
        animate={{
          y: [0, 40, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.1,
        }}
      />
      <motion.div
        className='absolute top-50 left-1/4 w-6 h-6 bg-blue-400/20 dark:bg-blue-300/20 rounded-full'
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className='absolute top-120 right-1/3 w-4 h-4 bg-purple-400/25 dark:bg-purple-300/25 rounded-full'
        animate={{
          y: [0, 30, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.8,
        }}
      />
      <motion.div
        className='absolute bottom-60 left-1/2 w-8 h-8 bg-emerald-400/15 dark:bg-emerald-300/15 rounded-full'
        animate={{
          y: [0, -35, 0],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.2,
        }}
      />
      <motion.div
        className='absolute top-180 right-1/4 w-5 h-5 bg-rose-400/30 dark:bg-rose-300/30 rounded-full'
        animate={{
          y: [0, 45, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      />
      <motion.div
        className='absolute bottom-100 left-1/3 w-7 h-7 bg-amber-400/20 dark:bg-amber-300/20 rounded-full'
        animate={{
          y: [0, -50, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.3,
        }}
      />
      <motion.div
        className='absolute top-200 left-1/5 w-3 h-3 bg-indigo-400/40 dark:bg-indigo-300/40 rounded-full'
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      />
      <motion.div
        className='absolute bottom-140 right-1/5 w-6 h-6 bg-teal-400/25 dark:bg-teal-300/25 rounded-full'
        animate={{
          y: [0, 40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      />
      <motion.div
        className='absolute top-160 left-1/6 w-4 h-4 bg-pink-400/35 dark:bg-pink-300/35 rounded-full'
        animate={{
          y: [0, -30, 0],
          x: [0, 35, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.6,
        }}
      />
      <motion.div
        className='absolute bottom-160 left-1/4 w-9 h-9 bg-cyan-400/15 dark:bg-cyan-300/15 rounded-full'
        animate={{
          y: [0, -45, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.8,
        }}
      />
    </>
  )
}
