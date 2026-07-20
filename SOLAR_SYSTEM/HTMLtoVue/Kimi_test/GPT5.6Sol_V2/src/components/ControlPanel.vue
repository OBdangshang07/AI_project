<template>
  <aside id="right" class="glass">
    <div class="panel-title">SYSTEM CONTROL</div>
    <div class="toggle">小行星带<label class="switch"><input id="t-asteroid" type="checkbox" :checked="store.showAsteroid" @change="store.setAsteroid($event.target.checked)"><i></i></label></div>
    <div class="toggle">柯伊伯带<label class="switch"><input id="t-kuiper" type="checkbox" :checked="store.showKuiper" @change="store.setKuiper($event.target.checked)"><i></i></label></div>
    <div class="toggle">轨道线<label class="switch"><input id="t-orbits" type="checkbox" :checked="store.showOrbits" @change="store.setOrbits($event.target.checked)"><i></i></label></div>
    <div class="toggle">天体标签<label class="switch"><input id="t-labels" type="checkbox" :checked="store.showLabels" @change="store.setLabels($event.target.checked)"><i></i></label></div>
    <div class="toggle">大气外壳<label class="switch"><input id="t-atmo" type="checkbox" :checked="store.showAtmo" @change="store.setAtmo($event.target.checked)"><i></i></label></div>
    <div class="toggle">宜居带 / 黄道层<label class="switch"><input id="t-science" type="checkbox" :checked="store.showScience" @change="store.setScience($event.target.checked)"><i></i></label></div>
    <div class="toggle">电影色彩分级<label class="switch"><input id="t-cinema" type="checkbox" :checked="store.showCinema" @change="store.setCinema($event.target.checked)"><i></i></label></div>
    <div class="toggle">自适应画质<label class="switch"><input id="t-adaptive" type="checkbox" :checked="store.showAdaptive" @change="store.setAdaptive($event.target.checked)"><i></i></label></div>
    <div class="range-row"><header><span>时间倍率</span><output id="time-out">{{ store.timeSpeed }}×</output></header><input id="time-scale" type="range" min="0" max="1000" step="1" :value="store.timeSpeed" @input="store.setTimeSpeed(+$event.target.value)"></div>
    <button id="direction" @click="store.toggleDirection()">{{ store.directionText }}</button>
    <div class="range-row"><header><span>亮度 / Bloom</span><output id="bright-out">{{ store.brightText }}</output></header><input id="brightness" type="range" min="0.3" max="2.5" step="0.05" :value="store.brightness" @input="store.setBrightness(+$event.target.value)"></div>
    <div class="range-row"><header><span>星空密度</span><output id="stars-out">{{ store.starsText }}</output></header><input id="star-density" type="range" min="15" max="100" step="1" :value="store.starDensity" @input="store.setStarDensity(+$event.target.value)"></div>
    <div class="section-rule"></div>
    <div class="panel-title">CHRONO NAVIGATOR</div>
    <div class="micro-grid">
      <button @click="store.jumpDays(-365)">−1年</button>
      <button @click="store.jumpDays(-30)">−30日</button>
      <button id="pause" @click="store.togglePause()">{{ store.pauseText }}</button>
      <button @click="store.jumpDays(30)">+30日</button>
      <button @click="store.jumpDays(365)">+1年</button>
      <button id="today" @click="store.goToday()">归零</button>
    </div>
    <button id="reset" @click="store.reset()">重置史诗视角</button>
  </aside>
</template>

<script setup>
import { useSolarisStore } from '../stores/solaris.js'
const store = useSolarisStore()
</script>
