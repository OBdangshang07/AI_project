<script setup>
const metrics = [
  ['m-type', '天体类型', '行星系统'],
  ['m-diameter', '直径', '—'],
  ['m-axis', '轨道半长轴', '—'],
  ['m-rotation', '自转周期', '—'],
  ['m-orbit', '公转周期', '—'],
  ['m-temp', '表面温度', '—'],
  ['m-moons', '已知卫星', '—'],
]
</script>

<template>
  <aside id="info" class="glass">
    <div class="eyebrow">CELESTIAL DATABASE</div>
    <h1 id="info-name">太阳系</h1>
    <div id="info-en">SOLAR SYSTEM</div>
    <div id="info-desc">一座以实时轨道动力学驱动的程序化太阳系。双击任意天体进入近地观察。</div>
    <div v-for="([id, label, value]) in metrics" :key="id" class="metric">
      <label>{{ label }}</label>
      <b :id="id">{{ value }}</b>
    </div>
  </aside>
</template>
