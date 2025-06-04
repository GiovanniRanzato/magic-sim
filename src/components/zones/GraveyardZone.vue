<template>
  <div class="graveyard-zone">
    <h2>Cimitero ({{ graveyard.length }} carte)</h2>

    <div v-if="graveyard.length === 0">
      <p>Nessuna carta nel cimitero</p>
    </div>
    <div v-else class="last-card">
      <img :src="lastCard.imageUrl" :alt="lastCard.name" />
      <p>{{ lastCard.name }}</p>
    </div>

    <button class="btn" @click="startSearch('hand')">Recupera in mano</button>
    <button class="btn" @click="startSearch('battlefield')">Recupera in campo</button>

    <div v-if="isSearching" class="search-overlay">
      <h3>Seleziona una carta da recuperare</h3>
      <div class="search-grid">
        <div
          v-for="card in graveyard"
          :key="card.uuid"
          class="card-option"
          @click="selectCard(card)"
        >
          <img :src="card.imageUrl" :alt="card.name" />
          <p>{{ card.name }}</p>
        </div>
      </div>
      <button class="btn cancel" @click="cancelSearch">Annulla</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameStore } from '../../stores/game'
import type { Card } from '../../types/Card'

const game = useGameStore()
const graveyard = computed(() => game.graveyard)
const lastCard = computed(() => graveyard.value[graveyard.value.length - 1])

const isSearching = ref(false)
const targetZone = ref<'hand' | 'battlefield' | null>(null)

function startSearch(zone: 'hand' | 'battlefield') {
  targetZone.value = zone
  isSearching.value = true
}

function cancelSearch() {
  isSearching.value = false
  targetZone.value = null
}

function selectCard(card: Card) {
  const index = game.graveyard.indexOf(card)
  if (index !== -1) {
    game.graveyard.splice(index, 1)

    if (targetZone.value === 'hand') {
      game.hand.push(card)
    } else if (targetZone.value === 'battlefield') {
      // Per semplicità: le carte tornano in battlefield.creatures
      game.battlefield.creatures.push(card)
    }

    cancelSearch()
  }
}
</script>

<style scoped>
.graveyard-zone {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 220px;
  text-align: center;
  position: relative;
}

.last-card img {
  width: 80px;
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-bottom: 0.3rem;
}

.btn {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
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
