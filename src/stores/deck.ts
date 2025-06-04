// src/stores/deck.ts
import { defineStore } from 'pinia'
import type { Card } from '../types/Card'

export const useDeckStore = defineStore('deck', {
  state: () => ({
    allCards: [] as Card[],
    deck: [] as Card[]
  }),

  actions: {
    setAllCards(cards: Card[]) {
      this.allCards = cards
    },

    addToDeck(card: Card) {
      this.deck.push(card)
    },

    removeFromDeck(card: Card) {
      const index = this.deck.findIndex(c => c.uuid === card.uuid)
      if (index !== -1) this.deck.splice(index, 1)
    },

    resetDeck() {
      this.deck = []
    }
  }
})
