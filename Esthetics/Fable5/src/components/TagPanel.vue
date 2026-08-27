<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { engine } from '../store'

const props = defineProps<{ ch?: number; tilt?: 'l' | 'r' }>()
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (props.ch != null && el.value) engine.setAnchor(props.ch, el.value)
})
onBeforeUnmount(() => {
  if (props.ch != null) engine.setAnchor(props.ch, null)
})
</script>

<template>
  <div ref="el" class="tag" :class="tilt === 'r' ? 'tilt-r' : 'tilt-l'">
    <slot />
  </div>
</template>
