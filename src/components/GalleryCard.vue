<template>
  <div class="gallery-container">
    <!-- Barra di ricerca -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Cerca una carta..."
      class="search-input"
    />

    <!-- Grid carte -->
    <div class="card-grid">
      <DeckBuilderCardController
        v-for="card in filteredCards"
        :key="card.uuid"
        :card="card"
      >
      <CardDisplay :card=card></CardDisplay>
    </DeckBuilderCardController>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import cardData from '../assets/FIN.json'
import CardDisplay from './CardDisplay.vue'
import DeckBuilderCardController from './DeckBuilderCardController.vue'

const cards = ref([])
const searchQuery = ref('')

onMounted(() => {
  const rawCards = cardData.data.cards

  cards.value = rawCards
    .filter(card => card.side !== 'b')
    .filter(card => card.identifiers?.tcgplayerProductId)
    .map(card => {
      let flippable = false
      let backImageUrl = null

      const backCard = rawCards.find(c =>
        c.side === 'b' &&
        (card.otherFaceIds?.includes(c.uuid) || c.otherFaceIds?.includes(card.uuid))
      )

      if (backCard?.identifiers?.tcgplayerProductId) {
        flippable = true
        backImageUrl = `https://tcgplayer-cdn.tcgplayer.com/product/${backCard.identifiers.tcgplayerProductId}_1_in_1000x1000.jpg`
      }

      return {
        uuid: card.uuid,
        name: card.name,
        imageUrl: `https://tcgplayer-cdn.tcgplayer.com/product/${card.identifiers.tcgplayerProductId}_in_1000x1000.jpg`,
        flippable,
        backImageUrl
      }
    })
})

// Computed: filtro per nome + limita a 20 risultati
const filteredCards = computed(() => {
  return cards.value
    .filter(card => card.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .slice(0, 20)
})
</script>

<style scoped>
.gallery-container {
  padding: 1rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
