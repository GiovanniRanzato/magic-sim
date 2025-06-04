<template>
  <div class="battlefield-zone">
    <h2>Campo di Battaglia</h2>

    <div class="battlefield-section">
      <h3>Creature / Magie</h3>
      <div class="card-row">
        <div
          v-for="card in creatures"
          :key="card.uuid"
          class="card-wrapper"
          :class="{ tapped: isTapped(card) }"
        > 
        <CardAction :card="card">
            <button @click="toggleTap(card)">{{ isTapped(card) ? "Stap" : "Tap"}}</button>
            <button @click="moveToHand(card, 'creatures')">→ Mano</button>
            <button @click="moveToGraveyard(card, 'creatures')">→ Cimitero</button>
        </CardAction>
        </div>
      </div>
    </div>
    <div class="battlefield-section">
      <h3>Terre</h3>
      <div class="card-row">
        <div
          v-for="card in lands"
          :key="card.uuid"
          class="card-wrapper"
          :class="{ tapped: isTapped(card) }"
        >
            <CardAction :card="card">
            <button @click="toggleTap(card)">Tappa</button>
            <button @click="moveToHand(card, 'lands')">→ Mano</button>
            <button @click="moveToGraveyard(card, 'lands')">→ Cimitero</button>
            </CardAction>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useGameStore } from '../../stores/game'
import type { Card } from '../../types/Card'
import CardAction from '../CardAction.vue'

const game = useGameStore()

const lands = computed(() => game.battlefield.lands)
const creatures = computed(() => game.battlefield.creatures)

// Stato locale per carte tappate
const tappedCards = reactive(new Set<string>())

function toggleTap(card: Card) {
  if (tappedCards.has(card.uuid)) {
    tappedCards.delete(card.uuid)
  } else {
    tappedCards.add(card.uuid)
  }
}

function isTapped(card: Card): boolean {
  return tappedCards.has(card.uuid)
}

function moveToHand(card: Card, zone: 'lands' | 'creatures') {
  const index = game.battlefield[zone].indexOf(card)
  if (index !== -1) {
    game.battlefield[zone].splice(index, 1)
    game.hand.push(card)
  }
}

function moveToGraveyard(card: Card, zone: 'lands' | 'creatures') {
  const index = game.battlefield[zone].indexOf(card)
  if (index !== -1) {
    game.battlefield[zone].splice(index, 1)
    game.graveyard.push(card)
  }
}
</script>

<style scoped>
.battlefield-zone {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
}

.battlefield-section {
  margin-bottom: 1rem;
}

.card-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  transition: transform 0.3s ease;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.3rem;
}

button {
  padding: 0.25rem;
  font-size: 0.7rem;
  border: none;
  background-color: #444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #666;
}

.tapped {
  transform: rotate(90deg);
}
</style>
