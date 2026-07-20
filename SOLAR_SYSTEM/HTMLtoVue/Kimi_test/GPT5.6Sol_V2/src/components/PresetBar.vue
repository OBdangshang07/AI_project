<template>
  <nav id="presets" class="glass">
    <button @click="store.goView('overview')">太阳系全景</button>
    <button @click="store.goView('inner')">内太阳系</button>
    <button @click="store.goView('jupiter')">木星系统</button>
    <button @click="store.goView('saturn')">土星系统</button>
    <button @click="store.goView('pluto')">冥王星特写</button>
    <button @click="store.goView('distant')">远日天体</button>
  </nav>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
