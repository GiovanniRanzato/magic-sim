<template>
  <div class="card-container">
    <div class="card-flip-wrapper" :class="{ flipped: isFlipped }">
      <!-- Fronte -->
      <div class="card-face front">
        <img :src="card.imageUrl" :alt="card.name" />
      </div>

      <!-- Retro -->
      <div class="card-face back" v-if="card.flippable">
        <img :src="card.backImageUrl" :alt="card.name + ' back'" />
      </div>
    </div>

    <h3 class="card-name">{{ card.name }}</h3>

    <button
      v-if="card.flippable"
      @click="isFlipped = !isFlipped"
      class="flip-button"
    >
      ↻
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Card } from '../types/Card'

defineProps<{ card: Card }>()

const isFlipped = ref(false)
</script>

<style scoped>
.card-container {
  width: 250px;
  margin: 1rem;
  text-align: center;
  font-family: sans-serif;
  position: relative;
}

.card-flip-wrapper {
  position: relative;
  width: 100%;
  height: 350px;
  perspective: 1000px;
}

.card-face {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.6s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-face img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.front {
  transform: rotateY(0deg);
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
  z-index: 1;
}

.card-flip-wrapper.flipped .front {
  transform: rotateY(-180deg);
  z-index: 1;
}

.card-flip-wrapper.flipped .back {
  transform: rotateY(0deg);
  z-index: 2;
}

.flip-button {
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.flip-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.card-name {
  margin-top: 0.5rem;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
