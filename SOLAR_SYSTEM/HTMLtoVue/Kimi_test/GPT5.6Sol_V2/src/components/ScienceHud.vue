<template>
  <div id="science-hud" class="glass">{{ store.scienceHud }}</div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
