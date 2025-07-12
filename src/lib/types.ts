import React from 'react'

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert'
export type TechnologyType =
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'vue'
  | 'angular'
export type ChallengeCategory =
  | 'ui-components'
  | 'layouts'
  | 'animations'
  | 'games'
  | 'tools'

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: DifficultyLevel
  technologies: TechnologyType[]
  category: ChallengeCategory
  estimatedTime: number // in minutes
  isCompleted: boolean
  completedAt?: Date
  timeSpent?: number
  thumbnail?: string
  featured?: boolean
  instructions: string
  hints: string
  standards: string
  issues: string
  startingCode: {
    html: string
    css: string
    javascript: string
  }
  solutionCode: {
    html: string
    css: string
    javascript: string
    react: React.ComponentType
  }
  assets?: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserProgress {
  totalCompleted: number
  totalChallenges: number
  currentStreak: number
  totalTimeSpent: number
  difficultiesCompleted: Record<DifficultyLevel, number>
  technologiesUsed: Record<TechnologyType, number>
  categoriesCompleted: Record<ChallengeCategory, number>
}

export interface ChallengeFilters {
  difficulty?: DifficultyLevel[]
  technologies?: TechnologyType[]
  categories?: ChallengeCategory[]
  completed?: boolean
  searchQuery?: string
}
