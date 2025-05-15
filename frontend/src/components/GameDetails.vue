<script lang="ts">
import { defineComponent, PropType } from "vue"

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
  methods: {
    close() {
      this.$emit("close")
    },
    getImageUrl(fileName: string): string {
      return new URL(`../assets/images/${fileName}`, import.meta.url).href
    },
  },
})
</script>

<style scoped></style>
