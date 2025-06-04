<template>
  <div class="deck-builder-card">
    <slot></slot>
    <div class="actions">
      <button @click="addCard">＋</button>
      <button @click="removeCard">－</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '../types/Card'
import { useDeckStore } from '../stores/deck'

const props = defineProps<{ card: Card }>()

const deck = useDeckStore()

function addCard() {
  deck.addToDeck(props.card)
}
function removeCard() {
  deck.removeFromDeck(props.card)
}
</script>

<style scoped>
.deck-builder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

button {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background-color: white;
  color: gray;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #eee;
  transform: scale(1.05);
}
</style>
