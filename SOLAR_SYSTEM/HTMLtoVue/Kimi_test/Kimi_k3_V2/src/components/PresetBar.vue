<template>
  <div id="presets">
    <button @click="store.preset('overview')">太阳系全景</button>
    <button @click="store.preset('inner')">内太阳系</button>
    <button @click="store.preset('jupiter')">木星系统</button>
    <button @click="store.preset('saturn')">土星系统</button>
    <button @click="store.preset('pluto')">冥王星特写</button>
  </div>
</template>

<script setup>
import { useSolarStore } from '../stores/solar.js'
const store = useSolarStore()
</script>
