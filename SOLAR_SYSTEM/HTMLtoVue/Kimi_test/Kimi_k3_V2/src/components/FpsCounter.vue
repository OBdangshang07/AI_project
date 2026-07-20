<template>
  <div id="fps" class="glass" :style="{ color: store.fpsColor }">{{ store.fpsText }}</div>
</template>

<script setup>
import { useSolarStore } from '../stores/solar.js'
const store = useSolarStore()
</script>
