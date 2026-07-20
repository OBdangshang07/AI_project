<template>
  <div id="fps">{{ store.fpsText }}</div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
