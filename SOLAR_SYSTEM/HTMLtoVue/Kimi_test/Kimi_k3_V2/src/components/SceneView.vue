<template>
  <div id="scene" ref="sceneEl"></div>
  <div id="labelLayer" ref="labelEl"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SolarSystemEngine } from '../engine/SolarSystemEngine.js'
import { useSolarStore } from '../stores/solar.js'

const sceneEl = ref(null)
const labelEl = ref(null)
const store = useSolarStore()
let engine = null

onMounted(() => {
  engine = new SolarSystemEngine({
    container: sceneEl.value,
    labelLayer: labelEl.value,
    hooks: {
      onFps: n => store.setFps(n),
      onDatetime: s => store.setDatetime(s),
      onSelect: def => store.setSelected(def),
      onTourBar: t => store.setTourText(t),
      onMeasureBox: t => store.setMeasureText(t),
      onCount: n => store.setBodyCount(n),
      onPaused: p => { store.paused = p },
      onTimeSlider: v => { store.timeSlider = v },
      onDir: s => { store.dirSign = s },
      onRealScale: b => { store.realScale = b },
      onMeasureMode: b => { store.measureActive = b },
      onTourActive: b => { store.tourActive = b },
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
