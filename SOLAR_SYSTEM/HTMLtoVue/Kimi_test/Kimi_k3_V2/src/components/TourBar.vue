<template>
  <div id="tourBar" class="glass" :style="{ display: store.tourText ? 'block' : 'none' }">{{ store.tourText }}</div>
</template>

<script setup>
import { useSolarStore } from '../stores/solar.js'
const store = useSolarStore()
</script>
