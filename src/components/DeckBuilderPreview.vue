<template>
  <div class="deck-preview">
    <h2>Deck Preview ({{ deck.length }} carte)</h2>
    <div v-if="deck.length === 0">Il mazzo è vuoto</div>
    <ul v-else class="deck-list">
      <li v-for="(card, index) in deck" :key="index" class="deck-card">
        <DeckBuilderCardController :card=card>
        <img :src="card.imageUrl" :alt="card.name" class="card-img" />
        <span class="card-name">{{ card.name }}</span>
        </DeckBuilderCardController>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeckStore } from '../stores/deck'
import type { Card } from '../types/Card'
import DeckBuilderCardController from './DeckBuilderCardController.vue'

const deckStore = useDeckStore()

// deck è un array di Card
const deck = computed<Card[]>(() => deckStore.deck)
</script>

<style scoped>
.deck-preview {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.deck-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.deck-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}

.card-img {
  width: 58px;
  height: 80px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid #aaa;
}

.card-name {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  text-align: center;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
