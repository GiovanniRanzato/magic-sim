<template>
  <div class="game-container">
    <h1>Simulatore di Gioco</h1>

    <button class="new-game-button" @click="startNewGame">Nuova Partita</button>

    <div class="zones-grid">
      <BattlefieldZone class="battlefield-zone" />
      <HandZone class="hand-zone" />
      <GraveyardZone class="graveyard-zone" />
      <DeckZone class="deck-zone" />
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
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.new-game-button:hover {
  background-color: #555;
}

.zones-grid {
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-template-rows: auto auto;
  gap: 1rem;
  height: 700px;
}

/* Battlefield (in alto a sinistra) */
.battlefield-zone {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  overflow-y: auto;
  min-height: 350px;
}

/* Hand (in basso a sinistra) */
.hand-zone {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  overflow-x: auto;
  min-height: 250px;
}

/* Graveyard (in alto a destra) */
.graveyard-zone {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 220px;
  min-height: 350px;
  overflow-y: auto;
}

/* Deck (in basso a destra) */
.deck-zone {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 220px;
  min-height: 250px;
  overflow-y: auto;
}
</style>
