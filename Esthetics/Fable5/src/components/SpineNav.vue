<script setup lang="ts">
import { nav } from '../content/copy'
import { ui } from '../store'

function go(i: number): void {
  const secs = document.querySelectorAll<HTMLElement>('main .chapter')
  secs[i]?.scrollIntoView({ behavior: ui.calm ? 'auto' : 'smooth', block: 'start' })
}
</script>

<template>
  <nav class="spine" aria-label="章节">
    <button
      v-for="(n, i) in nav"
      :key="n"
      :class="{ on: ui.chapter === i }"
      :aria-current="ui.chapter === i ? 'true' : undefined"
      @click="go(i)"
    >
      {{ n }}
    </button>
  </nav>
</template>
