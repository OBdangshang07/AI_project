<template>
  <div id="tour-card" class="glass" :class="{ show: store.tourActive }">
    <b>{{ store.tourTitle }}</b>
    <span>{{ store.tourText }}</span>
  </div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
