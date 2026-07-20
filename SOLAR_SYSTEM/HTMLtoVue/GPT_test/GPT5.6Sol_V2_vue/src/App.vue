<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ControlPanel from './components/ControlPanel.vue'
import InfoPanel from './components/InfoPanel.vue'
import TelemetryOverlay from './components/TelemetryOverlay.vue'
import ToolDock from './components/ToolDock.vue'
import TopBar from './components/TopBar.vue'
import ViewPresets from './components/ViewPresets.vue'
import { createSolarSystem } from './solar-system/createSolarSystem.js'

const canvasWrap = ref(null)
const labelsHost = ref(null)
let solarSystem

onMounted(() => {
  solarSystem = createSolarSystem({
    canvasWrap: canvasWrap.value,
    labelsHost: labelsHost.value,
  })
})

onBeforeUnmount(() => solarSystem?.destroy())
</script>

<template>
  <div ref="labelsHost" class="scene-root" aria-hidden="true">
    <div id="canvas-wrap" ref="canvasWrap"></div>
    <div id="vignette"></div>
  </div>

  <TopBar />
  <InfoPanel />
  <ControlPanel />
  <ViewPresets />
  <ToolDock />
  <TelemetryOverlay />
</template>
