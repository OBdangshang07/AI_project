<script setup>
const toggles = [
  ['t-asteroid', '小行星带', true],
  ['t-kuiper', '柯伊伯带', true],
  ['t-orbits', '轨道线', true],
  ['t-labels', '天体标签', true],
  ['t-atmo', '大气外壳', true],
  ['t-science', '宜居带 / 黄道层', false],
  ['t-cinema', '电影色彩分级', true],
  ['t-adaptive', '自适应画质', true],
]

const jumps = [
  [-365, '−1年'],
  [-30, '−30日'],
  [30, '+30日'],
  [365, '+1年'],
]
</script>

<template>
  <aside id="right" class="glass">
    <div class="panel-title">SYSTEM CONTROL</div>
    <div v-for="([id, label, checked]) in toggles" :key="id" class="toggle">
      {{ label }}
      <label class="switch">
        <input :id="id" type="checkbox" :checked="checked" />
        <i></i>
      </label>
    </div>

    <div class="range-row">
      <header><span>时间倍率</span><output id="time-out">20×</output></header>
      <input id="time-scale" type="range" min="0" max="1000" step="1" value="20" />
    </div>
    <button id="direction">公转方向 · 顺行</button>

    <div class="range-row">
      <header><span>亮度 / Bloom</span><output id="bright-out">1.25</output></header>
      <input id="brightness" type="range" min="0.3" max="2.5" step="0.05" value="1.25" />
    </div>

    <div class="range-row">
      <header><span>星空密度</span><output id="stars-out">100%</output></header>
      <input id="star-density" type="range" min="15" max="100" step="1" value="100" />
    </div>

    <div class="section-rule"></div>
    <div class="panel-title">CHRONO NAVIGATOR</div>
    <div class="micro-grid">
      <button :data-jump="jumps[0][0]">{{ jumps[0][1] }}</button>
      <button :data-jump="jumps[1][0]">{{ jumps[1][1] }}</button>
      <button id="pause">暂停</button>
      <button :data-jump="jumps[2][0]">{{ jumps[2][1] }}</button>
      <button :data-jump="jumps[3][0]">{{ jumps[3][1] }}</button>
      <button id="today">归零</button>
    </div>
    <button id="reset">重置史诗视角</button>
  </aside>
</template>
