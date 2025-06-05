<template>
  <div class="card-in-play" ref="cardRef" tabindex="0">
    <img :src="card.imageUrl" :alt="card.name" class="card-img" @click="toggleMenu" />

    <!-- Menu azioni -->
    <div v-if="menuOpen" class="actions-menu" @click.stop>
      <slot/>
      <button @click="showImageModal()">Visualizza</button>
    </div>

    <!-- Modale immagine -->
    <div v-if="imageModalOpen" class="modal-overlay" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeImageModal">✖</button>
        <img :src="card.imageUrl" :alt="card.name" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Card } from '../types/Card'

defineProps<{ card: Card }>()

const menuOpen = ref(false)
const imageModalOpen = ref(false)
const cardRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onClickOutside(event: MouseEvent) {
  if (cardRef.value && !cardRef.value.contains(event.target as Node)) {
    menuOpen.value = false
    imageModalOpen.value = false
  }
}

function showImageModal() {
  imageModalOpen.value = true
  menuOpen.value = false
}

function closeImageModal() {
  imageModalOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.card-in-play {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
}

.card-img {
  width: 100px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  user-select: none;
}

.actions-menu {
  color: white;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 10;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: 0.95;
}

.menu-action {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  background-color: #444;
  border-radius: 4px;
  transition: background 0.2s;
}
.menu-action:hover {
  background-color: #555;
}

/* MODALE */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  position: relative;
  background: #000;
  width: 400px;
  border-radius: 32px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.modal-close {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
  background: transparent;
  color: white;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
