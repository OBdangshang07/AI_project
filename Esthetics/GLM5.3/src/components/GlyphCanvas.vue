<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { field } from '../field'
import { GLYPH_POOL, NEIGHBORS } from '../copy'
import { store } from '../store'

const cv = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!cv.value) return
  field.mount(cv.value, GLYPH_POOL, NEIGHBORS)
  field.onTemp = (t) => {
    store.liveTemp = t
  }
  field.onStill = (on) => {
    store.still = on
  }
  field.onFormed = () => {
    navigator.vibrate?.(10)
  }
  field.setReduced(store.reduced)
})

onBeforeUnmount(() => field.destroy())
</script>

<template>
  <canvas ref="cv" class="field" aria-hidden="true"></canvas>
</template>
