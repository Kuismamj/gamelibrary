<template>
  <div class="home">
    <Gamelist />
  </div>
</template>

<script lang="ts">
import Gamelist from "../components/Gamelist.vue"
import { defineComponent } from "vue"

export default defineComponent({
  name: "HomeView",
  components: {
    Gamelist,
  },
})
</script>
