'use client'

import { Badge } from '@/components/ui/badge'
import { Challenge } from '@/lib/types'
import { Clock } from 'lucide-react'

interface ChallengeHeaderProps {
  readonly challenge: Challenge
}

export function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  return (
    <div className='mb-8'>
      <h1 className='text-2xl font-bold mb-2'>{challenge.title}</h1>
      <div className='flex items-center gap-4 text-muted-foreground'>
        <Badge variant='secondary'>{challenge.category}</Badge>
        <div className='flex items-center gap-1'>
          <Clock className='h-4 w-4' />
          <span>{challenge.estimatedTime} min</span>
        </div>
      </div>
    </div>
  )
}
