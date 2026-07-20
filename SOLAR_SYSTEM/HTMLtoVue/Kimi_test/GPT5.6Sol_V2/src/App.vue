<template>
  <!-- 3D 场景 + 暗角 + CSS2D 标签层（由引擎挂载） -->
  <SceneView />

  <TopBar />
  <InfoPanel />
  <ControlPanel />
  <PresetBar />
  <ToolDock />
  <ScienceHud />
  <TourCard />
  <ScaleRuler />
  <ToastMessage />
  <FpsCounter />
  <BodyCounter />
  <HintBar />
</template>

<script setup>
import SceneView from './components/SceneView.vue'
import TopBar from './components/TopBar.vue'
import InfoPanel from './components/InfoPanel.vue'
import ControlPanel from './components/ControlPanel.vue'
import PresetBar from './components/PresetBar.vue'
import ToolDock from './components/ToolDock.vue'
import ScienceHud from './components/ScienceHud.vue'
import TourCard from './components/TourCard.vue'
import ScaleRuler from './components/ScaleRuler.vue'
import ToastMessage from './components/ToastMessage.vue'
import FpsCounter from './components/FpsCounter.vue'
import BodyCounter from './components/BodyCounter.vue'
import HintBar from './components/HintBar.vue'
</script>
