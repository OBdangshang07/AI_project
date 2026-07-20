<script setup>
const hint = '拖拽旋转 · 滚轮缩放 · 右键平移 · 单击查看 · 双击聚焦'
</script>

<template>
  <div id="science-hud" class="glass">选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距</div>
  <div id="tour-card" class="glass"><b></b><span></span></div>
  <div id="scale-ruler"><i></i><span>1 AU</span></div>
  <div id="toast" class="glass"></div>
  <div id="fps">FPS 60</div>
  <div id="count">CELESTIAL OBJECTS 000</div>
  <div id="hint">{{ hint }}</div>
</template>
