<template>
  <div id="tool-dock" class="glass">
    <button id="measure" :class="{ active: store.measureActive }" @click="store.toggleMeasure()">测距</button>
    <button id="tour" :class="{ active: store.tourActive }" @click="store.toggleTour()">{{ store.tourBtnText }}</button>
    <button id="follow" :class="{ active: store.followActive }" @click="store.toggleFollow()">{{ store.followBtnText }}</button>
  </div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
