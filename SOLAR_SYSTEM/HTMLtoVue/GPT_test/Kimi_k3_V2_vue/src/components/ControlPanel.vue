<script setup>
const toggles = [
  ['ckBelt', '小行星带'],
  ['ckKuiper', '柯伊伯带 + 奥尔特云'],
  ['ckOrbits', '轨道线'],
  ['ckTrails', '行星轨迹拖尾'],
  ['ckLabels', '天体标签'],
  ['ckAtmos', '大气外壳'],
]

const tools = [
  ['btnTour', '▶ 星际导览'],
  ['btnMeasure', '⇔ 测距工具'],
  ['btnScale', '真实比例：关'],
  ['btnShot', '📷 截图保存'],
  ['btnReset', '重置视角'],
]
</script>

<template>
  <aside id="ctrlPanel" class="glass">
    <h3>控制面板</h3>
    <h4>显示</h4>
    <div v-for="([id, label]) in toggles" :key="id" class="row">
      <label><input :id="id" type="checkbox" checked /> {{ label }}</label>
    </div>

    <h4>时间与运动</h4>
    <div class="row sliderRow">
      <span>时间倍率</span><input id="slTime" type="range" min="0" max="100" value="67" /><b id="timeVal">100x</b>
    </div>
    <div class="row"><button id="btnDir">公转方向：顺行</button></div>
    <div class="row rowFlex">
      <input id="dateInput" type="date" value="2024-01-01" /><button id="btnDate">跳转</button>
    </div>

    <h4>画面</h4>
    <div class="row sliderRow">
      <span>亮度</span><input id="slBright" type="range" min="20" max="200" value="100" /><b id="brightVal">1.0</b>
    </div>
    <div class="row sliderRow">
      <span>星空密度</span><input id="slStars" type="range" min="5" max="100" value="100" /><b id="starsVal">100%</b>
    </div>

    <h4>工具</h4>
    <div v-for="([id, label]) in tools" :key="id" class="row"><button :id="id">{{ label }}</button></div>
  </aside>
</template>
