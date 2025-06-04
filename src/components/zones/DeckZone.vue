<template>
  <div class="deck-zone">
    <h2>Mazzo ({{ deck.length }} carte)</h2>

    <div class="deck-back" @click="drawCard">
      <img src="../../assets/back_1.jpg" alt="Deck Back" />
      <p>Clicca per pescare</p>
    </div>

    <button class="btn" @click="shuffleDeck">Mescola</button>
    <button class="btn" @click="searchInDeck">Cerca nel mazzo</button>

    <div v-if="isSearching" class="search-overlay">
      <h3>Seleziona una carta da aggiungere alla mano</h3>
      <div class="search-grid">
        <div
          class="card-option"
          v-for="card in deck"
          :key="card.uuid"
          @click="selectCard(card)"
        >
          <img :src="card.imageUrl" :alt="card.name" />
        </div>
      </div>
      <button class="btn cancel" @click="isSearching = false">Annulla</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../../stores/game'
import type { Card } from '../../types/Card'

const game = useGameStore()
const isSearching = ref(false)

// 🔁 Computed: rende reattiva la lettura del mazzo
const deck = computed(() => game.deck)

function drawCard() {
  game.drawCard()
}

function shuffleDeck() {
  game.shuffleDeck()
}

function searchInDeck() {
  isSearching.value = true
}

function selectCard(card: Card) {
  const index = game.deck.findIndex(c => c.uuid === card.uuid)
  if (index !== -1) {
    game.deck.splice(index, 1)
    game.hand.push(card)
  }
  isSearching.value = false
}
</script>

<style scoped>
.deck-zone {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 220px;
  text-align: center;
  position: relative;
}

.deck-back img {
  width: 100px;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.btn {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: #444;
  color: white;
}

.btn.cancel {
  background-color: #a00;
}

.search-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  z-index: 10;
  overflow-y: auto;
}

.search-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
}

.card-option {
  width: 80px;
  cursor: pointer;
  text-align: center;
}

.card-option img {
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 4px;
}
</style>
