<template>
  <div class="card-in-play" ref="cardRef" tabindex="0">
    <img :src="card.imageUrl" :alt="card.name" class="card-img" @click="toggleMenu" />
    <div v-if="menuOpen" class="actions-menu" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Card } from '../types/Card'

defineProps<{ card: Card }>()

const menuOpen = ref(false)
const cardRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onClickOutside(event: MouseEvent) {
  if (cardRef.value && !cardRef.value.contains(event.target as Node)) {
    menuOpen.value = false
  }
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
  opacity: 0.8
}

.actions-menu ::v-deep > * {
  cursor: pointer;
}
</style>
