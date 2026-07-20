<template>
  <div id="topbar" class="glass">
    <SearchBox />
    <div id="date">{{ store.dateText }}</div>
  </div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
import SearchBox from './SearchBox.vue'
const store = useSolarisStore()
</script>
