import { create } from 'zustand'
import { Challenge, ChallengeFilters, UserProgress } from '@/lib/types'
import { SAMPLE_CHALLENGES } from '@/lib/data'

interface ChallengeStore {
  challenges: Challenge[]
  currentChallenge: Challenge | null
  filters: ChallengeFilters
  userProgress: UserProgress

  // Actions
  setChallenges: (challenges: Challenge[]) => void
  setCurrentChallenge: (challenge: Challenge | null) => void
  updateFilters: (filters: Partial<ChallengeFilters>) => void
  completeChallenge: (challengeId: string, timeSpent: number) => void
  getFilteredChallenges: () => Challenge[]
  calculateProgress: () => void
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challenges: SAMPLE_CHALLENGES,
  currentChallenge: null,
  filters: {},
  userProgress: {
    totalCompleted: 0,
    totalChallenges: SAMPLE_CHALLENGES.length,
    currentStreak: 0,
    totalTimeSpent: 0,
    difficultiesCompleted: { easy: 0, medium: 0, hard: 0, expert: 0 },
    technologiesUsed: {
      html: 0,
      css: 0,
      javascript: 0,
      react: 0,
      vue: 0,
      angular: 0,
    },
    categoriesCompleted: {
      'ui-components': 0,
      layouts: 0,
      animations: 0,
      games: 0,
      tools: 0,
    },
  },

  setChallenges: (challenges) => set({ challenges }),

  setCurrentChallenge: (challenge) => set({ currentChallenge: challenge }),

  updateFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  completeChallenge: (challengeId, timeSpent) => {
    set((state) => ({
      challenges: state.challenges.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              isCompleted: true,
              completedAt: new Date(),
              timeSpent,
            }
          : challenge
      ),
    }))
    get().calculateProgress()
  },

  getFilteredChallenges: () => {
    const { challenges, filters } = get()
    return challenges.filter((challenge) => {
      if (
        filters.difficulty &&
        !filters.difficulty.includes(challenge.difficulty)
      )
        return false
      if (
        filters.technologies &&
        !filters.technologies.some((tech) =>
          challenge.technologies.includes(tech)
        )
      )
        return false
      if (
        filters.categories &&
        !filters.categories.includes(challenge.category)
      )
        return false
      if (
        filters.completed !== undefined &&
        challenge.isCompleted !== filters.completed
      )
        return false
      if (
        filters.searchQuery &&
        !challenge.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      )
        return false
      return true
    })
  },

  calculateProgress: () => {
    const { challenges } = get()
    const completed = challenges.filter((c) => c.isCompleted)

    const userProgress: UserProgress = {
      totalCompleted: completed.length,
      totalChallenges: challenges.length,
      currentStreak: 0, // Implement streak calculation
      totalTimeSpent: completed.reduce((sum, c) => sum + (c.timeSpent || 0), 0),
      difficultiesCompleted: { easy: 0, medium: 0, hard: 0, expert: 0 },
      technologiesUsed: {
        html: 0,
        css: 0,
        javascript: 0,
        react: 0,
        vue: 0,
        angular: 0,
      },
      categoriesCompleted: {
        'ui-components': 0,
        layouts: 0,
        animations: 0,
        games: 0,
        tools: 0,
      },
    }

    completed.forEach((challenge) => {
      userProgress.difficultiesCompleted[challenge.difficulty]++
      userProgress.categoriesCompleted[challenge.category]++
      challenge.technologies.forEach((tech) => {
        userProgress.technologiesUsed[tech]++
      })
    })

    set({ userProgress })
  },
}))
