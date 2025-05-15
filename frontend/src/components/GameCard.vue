<template>
  <div>
    <div class="game-card border border-black p-2 rounded-lg bg-white">
      <img
        :src="`/${game.image}`"
        alt="game image"
        class="card-glow object-cover transition duration-300"
        @click="togglePopup"
      />
    </div>
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 border border-black"
    >
      <div class="bg-black p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-2">🎮 {{ game.name }}</h2>
        <p>❓ {{ game.description }}</p>
        <p>📅 Release date: {{ game.date }}</p>
        <button
          class="mt-4 px-4 py-2 bg-black text-white rounded transition-colors duration-150"
          @click="togglePopup"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :style="hover ? 'background-color: #d6d2d2;' : ''"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue"

interface Game {
  name: string
  image: string
  description: string
  date: string
}

export default defineComponent({
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true,
    },
  },
  setup() {
    const showPopup = ref(false)
    const hover = ref(false)
    const togglePopup = () => {
      showPopup.value = !showPopup.value
    }
    return { showPopup, togglePopup, hover }
  },
})
</script>

<style scoped>
:global(img.card-glow:hover) {
  box-shadow: 0 0 20px 2px #a5a3a3, 0 0 8px 2px #fff;
  transition: box-shadow 0.3s, transform 0.3s;
  transform: scale(1.05);
}
</style>
