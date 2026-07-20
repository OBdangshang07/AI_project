<template>
  <div id="count" class="glass">{{ store.bodyCountText }}</div>
</template>

<script setup>
import { useSolarStore } from '../stores/solar.js'
const store = useSolarStore()
</script>
