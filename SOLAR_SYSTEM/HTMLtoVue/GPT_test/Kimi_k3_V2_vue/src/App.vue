<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ControlPanel from './components/ControlPanel.vue'
import InfoPanel from './components/InfoPanel.vue'
import InteractionHint from './components/InteractionHint.vue'
import SceneViewport from './components/SceneViewport.vue'
import TitleStats from './components/TitleStats.vue'
import TopBar from './components/TopBar.vue'
import TourMeasureOverlay from './components/TourMeasureOverlay.vue'
import ViewPresets from './components/ViewPresets.vue'
import { createKimiSolarSystem } from './solar-system/createKimiSolarSystem.js'

const sceneViewport = ref(null)
let solarSystem

onMounted(() => {
  solarSystem = createKimiSolarSystem({
    sceneHost: sceneViewport.value.sceneHost,
    labelHost: sceneViewport.value.labelHost,
  })
})

onBeforeUnmount(() => solarSystem?.destroy())
</script>

<template>
  <SceneViewport ref="sceneViewport" />
  <TitleStats />
  <TopBar />
  <TourMeasureOverlay />
  <InfoPanel />
  <ControlPanel />
  <ViewPresets />
  <InteractionHint />
</template>
