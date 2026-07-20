<template>
  <div id="ctrlPanel" class="glass">
    <h3>控制面板</h3>
    <h4>显示</h4>
    <div class="row"><label><input type="checkbox" id="ckBelt" :checked="store.showBelt" @change="store.setBelt($event.target.checked)"> 小行星带</label></div>
    <div class="row"><label><input type="checkbox" id="ckKuiper" :checked="store.showKuiper" @change="store.setKuiper($event.target.checked)"> 柯伊伯带 + 奥尔特云</label></div>
    <div class="row"><label><input type="checkbox" id="ckOrbits" :checked="store.showOrbits" @change="store.setOrbits($event.target.checked)"> 轨道线</label></div>
    <div class="row"><label><input type="checkbox" id="ckTrails" :checked="store.showTrails" @change="store.setTrails($event.target.checked)"> 行星轨迹拖尾</label></div>
    <div class="row"><label><input type="checkbox" id="ckLabels" :checked="store.showLabels" @change="store.setLabels($event.target.checked)"> 天体标签</label></div>
    <div class="row"><label><input type="checkbox" id="ckAtmos" :checked="store.showAtmos" @change="store.setAtmos($event.target.checked)"> 大气外壳</label></div>
    <h4>时间与运动</h4>
    <div class="row sliderRow"><span>时间倍率</span><input type="range" id="slTime" min="0" max="100" :value="store.timeSlider" @input="store.setTimeSlider(+$event.target.value)"><b id="timeVal">{{ store.timeLabel }}</b></div>
    <div class="row"><button id="btnDir" @click="store.toggleDirection()">{{ store.dirText }}</button></div>
    <div class="row rowFlex"><input type="date" id="dateInput" v-model="dateStr"><button id="btnDate" @click="store.jumpToDate(dateStr)">跳转</button></div>
    <h4>画面</h4>
    <div class="row sliderRow"><span>亮度</span><input type="range" id="slBright" min="20" max="200" :value="store.brightness" @input="store.setBrightness(+$event.target.value)"><b id="brightVal">{{ store.brightText }}</b></div>
    <div class="row sliderRow"><span>星空密度</span><input type="range" id="slStars" min="5" max="100" :value="store.starDensity" @input="store.setStarDensity(+$event.target.value)"><b id="starsVal">{{ store.starsText }}</b></div>
    <h4>工具</h4>
    <div class="row"><button id="btnTour" :class="{ on: store.tourActive }" @click="store.toggleTour()">{{ store.tourBtnText }}</button></div>
    <div class="row"><button id="btnMeasure" :class="{ on: store.measureActive }" @click="store.toggleMeasure()">{{ store.measureBtnText }}</button></div>
    <div class="row"><button id="btnScale" :class="{ on: store.realScale }" @click="store.toggleRealScale()">{{ store.scaleText }}</button></div>
    <div class="row"><button id="btnShot" @click="store.screenshot()">📷 截图保存</button></div>
    <div class="row"><button id="btnReset" @click="store.resetView()">重置视角</button></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSolarStore } from '../stores/solar.js'

const store = useSolarStore()
const dateStr = ref('2024-01-01')
</script>
