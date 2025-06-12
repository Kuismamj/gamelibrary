<template>
  <div
    class="flex items-center mb-4"
    style="position: fixed; left: 0; top: 0; padding: 15px"
  >
    <button
      v-if="!searchOpen"
      @click="openSearch"
      class="w-10 h-10 rounded-full bg-white border flex items-center justify-center shadow hover:bg-gray-200 transition mr-2"
      aria-label="Open search"
    >
      <span style="font-size: 1rem">🔍</span>
    </button>
    <transition name="search-anim">
      <input
        v-show="searchOpen"
        ref="searchInput"
        v-model="search"
        type="text"
        placeholder="Search games..."
        class="border rounded px-2 py-1 w-64 transition-all duration-300 ease-out transform"
        @blur="closeSearch"
      />
    </transition>
    <div
      v-if="filteredGames.length && searchOpen && search"
      class="bg-white border rounded shadow absolute mt-10 z-50 w-64"
      style="margin: 4px"
    >
      <div
        v-for="game in filteredGames"
        :key="game._id"
        class="search-result px-2 py-1 text-left"
        @mousedown.prevent="scrollToGame(game._id)"
      >
        {{ game.name }}
      </div>
    </div>
  </div>
  <div>
    <h2
      style="text-align: center"
      @mouseover="hoverTitle = true"
      @mouseleave="hoverTitle = false"
    >
      My
      <h6 v-if="hoverTitle" small style="display: inline">quite small</h6>
      <span v-else></span>
      Game Library
    </h2>
  </div>
  <div>
    <h4 style="text-align: center">Total of games = {{ games.length }}</h4>
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9"
    style="text-align: center"
  >
    <GameCard
      v-for="game in games"
      :key="game._id"
      :game="game"
      @show-details="showGameDetails"
      :id="'game-' + game._id"
    />
  </div>

  <GameDetails
    v-if="selectedGame"
    :game="selectedGame"
    @close="selectedGame = null"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, onMounted } from "vue"
import axios from "axios"
import GameCard from "./GameCard.vue"
import GameDetails from "./GameDetails.vue"

export default defineComponent({
  components: { GameCard, GameDetails },
  setup() {
    interface Game {
      _id: string
      name: string
      description: string
      image: string
      date: string
    }

    const games = ref<Game[]>([])
    const selectedGame = ref<Game | null>(null)
    const search = ref("")
    const searchOpen = ref(false)
    const searchInput = ref<HTMLInputElement | null>(null)
    const hoverTitle = ref(false)

    const openSearch = async () => {
      searchOpen.value = true
      await nextTick()
      searchInput.value?.focus()
    }
    const closeSearch = () => {
      // Sulje vain jos ei ole hakua
      if (!search.value) searchOpen.value = false
    }

    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://gamelibrary-tjij.onrender.com/games"
        )
        games.value = response.data
      } catch (error) {
        console.error("Pelit ei latautunut:", error)
      }
    }

    const showGameDetails = (game: Game) => {
      selectedGame.value = game
    }

    const filteredGames = computed(() => {
      if (!search.value) return []
      return games.value.filter((game) =>
        game.name.toLowerCase().includes(search.value.toLowerCase())
      )
    })

    const scrollToGame = async (id: string) => {
      search.value = ""
      searchOpen.value = false
      await nextTick()
      const el = document.getElementById("game-" + id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    fetchGames()

    return {
      games,
      selectedGame,
      showGameDetails,
      search,
      filteredGames,
      scrollToGame,
      searchOpen,
      openSearch,
      closeSearch,
      searchInput,
      hoverTitle,
    }
  },
})
</script>

<style scoped>
/* Tailwind CSS: Oletusarvot */
.flex {
  position: relative;
}
.search-anim-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.search-anim-leave-active {
  transition: none;
}
.search-anim-enter-from,
.search-anim-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.search-anim-enter-to,
.search-anim-leave-from {
  opacity: 1;
  transform: scale(1);
}
.search-result {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s;
}
.search-result:hover {
  cursor: pointer;
  background: rgba(64, 64, 65, 0.7); /* tumma, hieman läpinäkyvä */
  transform: scale(1.05);
}
</style>
