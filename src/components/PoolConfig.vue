<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Stato del JSON pool carte come stringa
const poolJson = ref('[]') 

// Carica il pool da localStorage se esiste
onMounted(() => {
  const saved = localStorage.getItem('magicPool')
  if (saved) poolJson.value = saved
})

// Salva nel localStorage e prova a validare JSON
function savePool() {
  try {
    JSON.parse(poolJson.value)  // se non va in errore è valido
    localStorage.setItem('magicPool', poolJson.value)
    alert('Pool salvato con successo!')
  } catch(e) {
    alert('JSON non valido! Correggi e riprova.')
  }
}
</script>

<template>
  <div>
    <textarea
      v-model="poolJson"
      rows="15"
      class="w-full p-2 border rounded font-mono text-sm"
      placeholder='Inserisci JSON pool carte, es: [{"name":"Carta1","image":"url1","flippable":true}, ...]'
    ></textarea>
    <button
      @click="savePool"
      class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Salva Pool
    </button>
  </div>
</template>
