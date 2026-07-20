<template>
  <div id="topbar">
    <div id="datetime" class="glass">{{ store.datetime }}</div>
    <SearchBox />
  </div>
</template>

<script setup>
import { useSolarStore } from '../stores/solar.js'
import SearchBox from './SearchBox.vue'
const store = useSolarStore()
</script>
