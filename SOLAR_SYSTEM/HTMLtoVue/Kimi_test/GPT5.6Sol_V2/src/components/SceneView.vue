<template>
  <div id="scene-root" ref="rootEl">
    <div id="canvas-wrap" ref="canvasWrap"></div>
    <div id="vignette"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SolarisEngine } from '../engine/SolarisEngine.js'
import { useSolarisStore } from '../stores/solaris.js'

const rootEl = ref(null)
const canvasWrap = ref(null)
const store = useSolarisStore()
let engine = null

onMounted(() => {
  engine = new SolarisEngine({
    canvasWrap: canvasWrap.value,
    labelsHost: rootEl.value,
    hooks: {
      onFps: n => store.setFps(n),
      onDate: s => store.setDate(s),
      onCount: s => store.setCount(s),
      onSelect: def => store.setSelected(def),
      onScienceHud: s => store.setScienceHud(s),
      onToast: msg => store.toast(msg),
      onTourActive: b => store.setTourActive(b),
      onTourCard: c => store.setTourCard(c),
      onFollowActive: b => store.setFollowActive(b),
      onMeasureActive: b => store.setMeasureActive(b),
      onSpeed: v => { store.timeSpeed = v },
      onDirection: s => { store.dirSign = s },
      onScaleRuler: s => store.setScaleRuler(s),
    },
  })
  store.bindEngine(engine)
  engine.start()
})

onBeforeUnmount(() => {
  store.bindEngine(null)
  engine?.dispose()
  engine = null
})
</script>
