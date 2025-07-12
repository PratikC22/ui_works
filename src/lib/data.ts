import { Challenge } from './types'
import accordion from './challenges/accordion'
import analogClock from './challenges/analog-clock'
import boardOfBoredom from './challenges/board-of-boredom'

export const SAMPLE_CHALLENGES: Challenge[] = [
  accordion as Challenge,
  analogClock as Challenge,
  boardOfBoredom as Challenge,
]
