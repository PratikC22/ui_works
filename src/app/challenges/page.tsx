'use client'

import { ChallengeGrid } from '@/components/challenge/challenge-grid'
import { ChallengeFilter } from '@/components/challenge/challenge-filter'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'
import { useChallengeStore } from '@/store/challenge-store'

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const { updateFilters, filters } = useChallengeStore()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    updateFilters({ searchQuery: query })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Frontend Challenges</h1>
        <p className='text-muted-foreground'>
          Practice your frontend skills with real-world coding challenges
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className='flex flex-col sm:flex-row gap-4 mb-8'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search challenges...'
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className='pl-10'
          />
        </div>
        <Button
          variant='outline'
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2'
        >
          <Filter className='h-4 w-4' />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className='mb-8'>
          <ChallengeFilter filters={filters} onFiltersChange={updateFilters} />
        </div>
      )}

      {/* Challenge Grid */}
      <ChallengeGrid />
    </div>
  )
}
