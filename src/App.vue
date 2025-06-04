<script setup lang="ts">
import { ref } from 'vue'
import GalleryCard from './components/GalleryCard.vue'
import DeckBuilderPreview from './components/DeckBuilderPreview.vue'
import Game from './components/Game.vue'

const mode = ref<'deck' | 'game'>('deck')

function setMode(newMode: 'deck' | 'game') {
  mode.value = newMode
}
</script>

<template>
  <div class="p-4 max-w-6xl mx-auto">
    <nav class="mb-6 flex gap-4">
      <button 
        @click="setMode('deck')" 
        :class="{'font-bold underline': mode === 'deck'}"
        class="px-4 py-2 bg-blue-200 rounded"
      >
        Configura Mazzo
      </button>
      <button 
        @click="setMode('game')" 
        :class="{'font-bold underline': mode === 'game'}"
        class="px-4 py-2 bg-blue-200 rounded"
      >
        Simulazione Partita
      </button>
    </nav>

    <section>
      <div v-if="mode === 'deck'">
        <!-- Qui inseriremo configurazione mazzo -->
        <h2 class="text-xl font-semibold mb-4">Configura Mazzo</h2>
        <p>Seleziona carte dal pool per costruire il mazzo</p>
        <div class="deck-builder">
        <GalleryCard />
        <DeckBuilderPreview />
        </div>

      </div>

      <div v-if="mode === 'game'">
        <!-- Qui andrà la simulazione -->
        <h2 class="text-xl font-semibold mb-4">Simulazione Partita</h2>
        <Game />>
      </div>
    </section>
  </div>
</template>
<style scoped>
.deck-builder{
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
}
</style>
