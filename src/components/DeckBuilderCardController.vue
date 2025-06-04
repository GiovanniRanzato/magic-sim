<template>
  <div class="deck-builder-card">
    <slot default></slot>
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
</style>
