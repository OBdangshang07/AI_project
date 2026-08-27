<script setup lang="ts">
import { SECTIONS } from '../copy'
import { store } from '../store'
</script>

<template>
  <nav class="rail" aria-label="章节导航">
    <a
      v-for="s in SECTIONS"
      :key="s.id"
      :href="'#sec-' + s.id"
      :class="{ act: store.section === s.id }"
      :aria-current="store.section === s.id ? 'true' : undefined"
    >
      <span class="lbl mono">{{ s.n }}&nbsp;{{ s.name }}</span>
      <i class="tick" aria-hidden="true"></i>
    </a>
    <p class="tau mono" aria-hidden="true">τ&nbsp;{{ store.liveTemp.toFixed(2) }}</p>
  </nav>
</template>
