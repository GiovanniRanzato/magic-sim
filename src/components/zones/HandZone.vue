<template>
  <div class="hand-zone">
    <h2>Mano ({{ hand.length }} carte)</h2>

    <div class="hand-cards">
      <div
        v-for="card in hand"
        :key="card.uuid"
        class="card-wrapper"
      >
        <img :src="card.imageUrl" :alt="card.name" class="card-img" />
        <div class="actions">
          <button @click="playAsCreature(card)">Battlefield</button>
          <button @click="playAsLand(card)">Lands</button>
          <button @click="sendToGraveyard(card)">Cimitero</button>
          <button @click="putOnTop(card)">↑ Mazzo</button>
          <button @click="putOnBottom(card)">↓ Mazzo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../../stores/game'
import type { Card } from '../../types/Card'

const game = useGameStore()

const hand = computed(() => game.hand)

function playAsLand(card: Card) {
  game.hand.splice(game.hand.indexOf(card), 1)
  game.battlefield.lands.push(card)
}

function playAsCreature(card: Card) {
  game.hand.splice(game.hand.indexOf(card), 1)
  game.battlefield.creatures.push(card)
}

function sendToGraveyard(card: Card) {
  game.hand.splice(game.hand.indexOf(card), 1)
  game.graveyard.push(card)
}

function putOnTop(card: Card) {
  game.hand.splice(game.hand.indexOf(card), 1)
  game.deck.unshift(card)
}

function putOnBottom(card: Card) {
  game.hand.splice(game.hand.indexOf(card), 1)
  game.deck.push(card)
}
</script>

<style scoped>
.hand-zone {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
}

.hand-cards {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}

.card-img {
  width: 80px;
  height: 112px;
  object-fit: cover;
  border: 1px solid #aaa;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.actions button {
  font-size: 0.75rem;
  padding: 0.2rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: white;
}

.actions button:hover {
  background-color: #666;
}
</style>
