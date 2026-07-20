<template>
  <div id="toast" class="glass" :class="{ show: store.toastShow }">{{ store.toastText }}</div>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
