'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, Play } from 'lucide-react'
import { Challenge } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ChallengeCardProps {
  readonly challenge: Readonly<Challenge>
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      medium:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      expert:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    }
    return colors[difficulty as keyof typeof colors]
  }

  const getTechColor = (tech: string) => {
    const colors = {
      html: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      css: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      javascript:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      react: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      vue: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      angular: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    }
    return colors[tech as keyof typeof colors]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className='h-full'
    >
      <Card className='h-full flex flex-col hover:shadow-lg transition-shadow duration-300'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between'>
            <CardTitle className='text-lg leading-tight'>
              {challenge.title}
            </CardTitle>
            {challenge.isCompleted && (
              <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
            )}
          </div>

          <div className='flex flex-wrap gap-2 mt-2'>
            <Badge className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
            {challenge.technologies.map((tech) => (
              <Badge
                key={tech}
                variant='secondary'
                className={getTechColor(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className='flex-1 flex flex-col'>
          <p className='text-sm text-muted-foreground mb-4 flex-1'>
            {challenge.description}
          </p>

          <div className='flex items-center justify-between'>
            <div className='flex items-center text-sm text-muted-foreground'>
              <Clock className='h-4 w-4 mr-1' />
              {challenge.estimatedTime}m
            </div>

            <Link href={`/challenges/${challenge.id}`}>
              <Button
                size='sm'
                className='flex items-center gap-2 cursor-pointer'
              >
                <Play className='h-4 w-4' />
                View
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
