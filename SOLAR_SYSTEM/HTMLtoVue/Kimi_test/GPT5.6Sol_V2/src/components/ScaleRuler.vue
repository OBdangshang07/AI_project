<template>
  <div id="scale-ruler"><i></i><span>{{ store.scaleRuler }}</span></div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
