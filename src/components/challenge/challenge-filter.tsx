'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ChallengeFilters,
  DifficultyLevel,
  TechnologyType,
  ChallengeCategory,
} from '@/lib/types'

interface ChallengeFilterProps {
  filters?: ChallengeFilters
  onFiltersChange?: (filters: ChallengeFilters) => void
}

const DIFFICULTY_OPTIONS: {
  value: DifficultyLevel
  label: string
  color: string
}[] = [
  {
    value: 'easy',
    label: 'Easy',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  },
  {
    value: 'medium',
    label: 'Medium',
    color:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  },
  {
    value: 'hard',
    label: 'Hard',
    color:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  },
  {
    value: 'expert',
    label: 'Expert',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  },
]

const TECHNOLOGY_OPTIONS: { value: TechnologyType; label: string }[] = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

const CATEGORY_OPTIONS: { value: ChallengeCategory; label: string }[] = [
  { value: 'ui-components', label: 'UI Components' },
  { value: 'layouts', label: 'Layouts' },
  { value: 'animations', label: 'Animations' },
  { value: 'games', label: 'Games' },
  { value: 'tools', label: 'Tools' },
]

export function ChallengeFilter({
  filters = {},
  onFiltersChange,
}: ChallengeFilterProps) {
  const handleDifficultyChange = (
    difficulty: DifficultyLevel,
    checked: boolean
  ) => {
    if (!onFiltersChange) return

    const currentDifficulties = filters.difficulty || []
    const newDifficulties = checked
      ? [...currentDifficulties, difficulty]
      : currentDifficulties.filter((d) => d !== difficulty)

    onFiltersChange({
      ...filters,
      difficulty: newDifficulties.length > 0 ? newDifficulties : undefined,
    })
  }

  const handleTechnologyChange = (
    technology: TechnologyType,
    checked: boolean
  ) => {
    if (!onFiltersChange) return

    const currentTechnologies = filters.technologies || []
    const newTechnologies = checked
      ? [...currentTechnologies, technology]
      : currentTechnologies.filter((t) => t !== technology)

    onFiltersChange({
      ...filters,
      technologies: newTechnologies.length > 0 ? newTechnologies : undefined,
    })
  }

  const handleCategoryChange = (
    category: ChallengeCategory,
    checked: boolean
  ) => {
    if (!onFiltersChange) return

    const currentCategories = filters.categories || []
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter((c) => c !== category)

    onFiltersChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined,
    })
  }

  const handleCompletionChange = (completed: boolean | undefined) => {
    if (!onFiltersChange) return

    onFiltersChange({
      ...filters,
      completed: completed,
    })
  }

  const clearAllFilters = () => {
    if (!onFiltersChange) return
    onFiltersChange({})
  }

  const activeFilterCount = [
    filters.difficulty ? filters.difficulty.length : 0,
    filters.technologies ? filters.technologies.length : 0,
    filters.categories ? filters.categories.length : 0,
    filters.completed !== undefined ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0)

  return (
    <div className='space-y-4'>
      {/* Filter Options */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Difficulty Filter */}
        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Difficulty</h3>
          <div className='space-y-2'>
            {DIFFICULTY_OPTIONS.map((option) => (
              <label
                key={option.value}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={filters.difficulty?.includes(option.value) || false}
                  onChange={(e) =>
                    handleDifficultyChange(option.value, e.target.checked)
                  }
                  className='rounded'
                />
                <Badge variant='outline' className={option.color}>
                  {option.label}
                </Badge>
              </label>
            ))}
          </div>
        </div>

        {/* Technology Filter */}
        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Technology</h3>
          <div className='space-y-2'>
            {TECHNOLOGY_OPTIONS.map((option) => (
              <label
                key={option.value}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={
                    filters.technologies?.includes(option.value) || false
                  }
                  onChange={(e) =>
                    handleTechnologyChange(option.value, e.target.checked)
                  }
                  className='rounded'
                />
                <span className='text-sm'>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Category</h3>
          <div className='space-y-2'>
            {CATEGORY_OPTIONS.map((option) => (
              <label
                key={option.value}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={filters.categories?.includes(option.value) || false}
                  onChange={(e) =>
                    handleCategoryChange(option.value, e.target.checked)
                  }
                  className='rounded'
                />
                <span className='text-sm'>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Status</h3>
          <div className='space-y-2'>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='radio'
                name='status-filter'
                checked={filters.completed === undefined}
                onChange={() => handleCompletionChange(undefined)}
                className='rounded'
              />
              <span className='text-sm'>All</span>
            </label>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='radio'
                name='status-filter'
                checked={filters.completed === true}
                onChange={() => handleCompletionChange(true)}
                className='rounded'
              />
              <span className='text-sm'>Completed</span>
            </label>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='radio'
                name='status-filter'
                checked={filters.completed === false}
                onChange={() => handleCompletionChange(false)}
                className='rounded'
              />
              <span className='text-sm'>Not Completed</span>
            </label>
          </div>
        </div>
      </div>

      {/* Clear All Button */}
      {activeFilterCount > 0 && (
        <div className='flex justify-between items-center'>
          <Button
            variant='ghost'
            size='sm'
            onClick={clearAllFilters}
            className='text-xs'
          >
            Clear all filters
          </Button>
          <span className='text-xs text-muted-foreground'>
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}{' '}
            active
          </span>
        </div>
      )}

      {/* Active Filter Badges */}
      {activeFilterCount > 0 && (
        <div className='flex flex-wrap gap-1'>
          {filters.difficulty?.map((difficulty) => {
            const option = DIFFICULTY_OPTIONS.find(
              (d) => d.value === difficulty
            )
            return (
              <Badge
                key={`difficulty-${difficulty}`}
                variant='secondary'
                className='gap-1'
              >
                {option?.label}
                <X
                  className='size-3 cursor-pointer'
                  onClick={() => handleDifficultyChange(difficulty, false)}
                />
              </Badge>
            )
          })}

          {filters.technologies?.map((technology) => {
            const option = TECHNOLOGY_OPTIONS.find(
              (t) => t.value === technology
            )
            return (
              <Badge
                key={`technology-${technology}`}
                variant='secondary'
                className='gap-1'
              >
                {option?.label}
                <X
                  className='size-3 cursor-pointer'
                  onClick={() => handleTechnologyChange(technology, false)}
                />
              </Badge>
            )
          })}

          {filters.categories?.map((category) => {
            const option = CATEGORY_OPTIONS.find((c) => c.value === category)
            return (
              <Badge
                key={`category-${category}`}
                variant='secondary'
                className='gap-1'
              >
                {option?.label}
                <X
                  className='size-3 cursor-pointer'
                  onClick={() => handleCategoryChange(category, false)}
                />
              </Badge>
            )
          })}

          {filters.completed !== undefined && (
            <Badge variant='secondary' className='gap-1'>
              {filters.completed ? 'Completed' : 'Not Completed'}
              <X
                className='size-3 cursor-pointer'
                onClick={() => handleCompletionChange(!filters.completed)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
