import type { Card } from './Card'

export interface GameState {
  deck: Card[]
  hand: Card[]
  graveyard: Card[]
  battlefield: {
    lands: Card[]
    creatures: Card[]
  }
}
