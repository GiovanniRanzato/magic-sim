<script setup lang="ts">
import { ref } from 'vue'
import PoolConfig from './components/PoolConfig.vue'
import GalleryCard from './components/GalleryCard.vue'

const mode = ref<'pool' | 'deck' | 'game'>('pool')

function setMode(newMode: 'pool' | 'deck' | 'game') {
  mode.value = newMode
}
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <nav class="mb-6 flex gap-4">
      <button 
        @click="setMode('pool')" 
        :class="{'font-bold underline': mode === 'pool'}"
        class="px-4 py-2 bg-blue-200 rounded"
      >
        Configura Pool
      </button>
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
      <div v-if="mode === 'pool'">
        <h2 class="text-xl font-semibold mb-4">Configura Pool</h2>
        <p>Visualizza il pool di carte selezionabili</p>
        <section>
          <GalleryCard />
        </section>
      </div>

      <div v-if="mode === 'deck'">
        <!-- Qui inseriremo configurazione mazzo -->
        <h2 class="text-xl font-semibold mb-4">Configura Mazzo</h2>
        <p>Seleziona carte dal pool per costruire il mazzo</p>
      </div>

      <div v-if="mode === 'game'">
        <!-- Qui andrà la simulazione -->
        <h2 class="text-xl font-semibold mb-4">Simulazione Partita</h2>
        <p>Interazione con il mazzo e zone di gioco</p>
      </div>
    </section>
  </div>
</template>
