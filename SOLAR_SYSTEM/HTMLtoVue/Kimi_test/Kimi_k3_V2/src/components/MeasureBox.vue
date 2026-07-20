<template>
  <div id="measureBox" class="glass" :style="{ display: store.measureText ? 'block' : 'none' }">{{ store.measureText }}</div>
</template>

<script setup>
import { useSolarStore } from '../stores/solar.js'
const store = useSolarStore()
</script>
