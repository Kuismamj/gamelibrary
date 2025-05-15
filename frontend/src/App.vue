<template>
  <div id="app" class="p-6">
    <GameList />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import GameList from "./components/Gamelist.vue"

export default defineComponent({
  name: "App",
  components: {
    GameList,
  },
})
</script>
<style></style>
