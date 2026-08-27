<script setup lang="ts">
import { computed } from 'vue'
import StageCanvas from './components/StageCanvas.vue'
import SpineNav from './components/SpineNav.vue'
import ToggleDock from './components/ToggleDock.vue'
import SectionHero from './components/SectionHero.vue'
import SectionCenter from './components/SectionCenter.vue'
import SectionShape from './components/SectionShape.vue'
import SectionKiln from './components/SectionKiln.vue'
import SectionVessel from './components/SectionVessel.vue'
import { a11y, vessel } from './content/copy'
import { ui } from './store'

const liveText = computed(() => a11y.status(ui.stats.touches, ui.stats.passes))
</script>

<template>
  <StageCanvas />
  <main>
    <SectionHero />
    <SectionCenter />
    <SectionShape />
    <SectionKiln />
    <SectionVessel />
  </main>
  <footer>
    <p v-for="ln in vessel.foot" :key="ln">{{ ln }}</p>
  </footer>
  <SpineNav />
  <ToggleDock />
  <div class="sr-only" aria-live="polite">{{ liveText }}</div>
</template>
