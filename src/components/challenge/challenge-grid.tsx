'use client'

import { ChallengeCard } from './challenge-card'
import { useChallengeStore } from '@/store/challenge-store'
import { motion } from 'framer-motion'

export function ChallengeGrid() {
  const { getFilteredChallenges } = useChallengeStore()
  const challenges = getFilteredChallenges()

  if (challenges.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <p className='text-lg text-muted-foreground mb-2'>
          No challenges found
        </p>
        <p className='text-sm text-muted-foreground'>
          Try adjusting your filters
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ChallengeCard challenge={challenge} />
        </motion.div>
      ))}
    </motion.div>
  )
}
