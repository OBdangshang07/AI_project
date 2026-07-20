<template>
  <!-- 3D 场景 + CSS2D 标签层 -->
  <SceneView />
  <!-- 升级：CSS 暗角（零 GPU 开销的电影感画框） -->
  <div id="vignette"></div>

  <TitleBadge />
  <FpsCounter />
  <BodyCounter />
  <TopBar />
  <TourBar />
  <MeasureBox />
  <InfoPanel />
  <ControlPanel />
  <PresetBar />
  <HintBar />
</template>

<script setup>
import SceneView from './components/SceneView.vue'
import TitleBadge from './components/TitleBadge.vue'
import FpsCounter from './components/FpsCounter.vue'
import BodyCounter from './components/BodyCounter.vue'
import TopBar from './components/TopBar.vue'
import TourBar from './components/TourBar.vue'
import MeasureBox from './components/MeasureBox.vue'
import InfoPanel from './components/InfoPanel.vue'
import ControlPanel from './components/ControlPanel.vue'
import PresetBar from './components/PresetBar.vue'
import HintBar from './components/HintBar.vue'
</script>
