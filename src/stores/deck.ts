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
      this.saveDeckToSession()
    },

    removeFromDeck(card: Card) {
      const index = this.deck.findIndex(c => c.uuid === card.uuid)
      if (index !== -1) {
        this.deck.splice(index, 1)
        this.saveDeckToSession()
      }
    },

    resetDeck() {
      this.deck = []
      this.saveDeckToSession()
    },

    saveDeckToSession() {
      sessionStorage.setItem('deck', JSON.stringify(this.deck))
    },

    loadDeckFromSession() {
      const stored = sessionStorage.getItem('deck')
      if (stored) {
        try {
          this.deck = JSON.parse(stored)
        } catch (e) {
          console.error('Errore nel parsing del mazzo dal sessionStorage:', e)
          this.deck = []
        }
      }
    }
  }
})
