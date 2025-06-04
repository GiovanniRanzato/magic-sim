<template>
  <div class="game-container">
    <h1>Simulatore di Gioco</h1>

    <button class="new-game-button" @click="startNewGame">
      🔄 Nuova Partita
    </button>

    <div class="zones-row">
      <DeckZone/>
      <BattlefieldZone />
      <HandZone/>
      <GraveyardZone />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeckStore } from '../stores/deck'
import { useGameStore } from '../stores/game'
import DeckZone from './zones/DeckZone.vue'
import HandZone from './zones/HandZone.vue'
import BattlefieldZone from './zones/BattlefieldZone.vue'
import GraveyardZone from './zones/GraveyardZone.vue'


const deckStore = useDeckStore()
const gameStore = useGameStore()

function startNewGame() {
  gameStore.initializeGame(deckStore.deck)
}
</script>

<style scoped>
.game-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.new-game-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.new-game-button:hover {
  background-color: #1b5e20;
}

.zones-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
