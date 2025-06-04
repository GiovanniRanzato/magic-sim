<template>
    <div class="card-container">
      <div class="card-image-wrapper" :class="{ flipped: isFlipped }">
        <img
          :src="isFlipped && card.flippable ? card.backImageUrl : card.imageUrl"
          :alt="card.name"
          class="card-image"
        />
      </div>
      <h3 class="card-name">{{ card.name }}</h3>
      <button v-if="card.flippable" @click="isFlipped = !isFlipped" class="flip-button">
        Flip
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Props
  const props = defineProps({
    card: {
      type: Object,
      required: true
    }
  })
  
  // Stato locale per flip
  const isFlipped = ref(false)
  </script>
  
  <style scoped>
  .card-container {
    width: 250px;
    margin: 1rem;
    text-align: center;
    font-family: sans-serif;
  }
  
  .card-image-wrapper {
    perspective: 1000px;
  }
  
  .card-image {
    width: 100%;
    border-radius: 12px;
    transition: transform 0.6s;
    backface-visibility: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .flip-button {
    margin-top: 0.5rem;
    padding: 0.3rem 0.8rem;
    border: none;
    background-color: #444;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }
  </style>
  