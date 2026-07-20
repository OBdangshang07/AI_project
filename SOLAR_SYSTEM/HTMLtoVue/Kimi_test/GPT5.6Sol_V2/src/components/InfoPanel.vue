<template>
  <aside id="info" class="glass">
    <div class="eyebrow">CELESTIAL DATABASE</div>
    <h1 id="info-name">{{ info.cn }}</h1>
    <div id="info-en">{{ info.en }}</div>
    <div id="info-desc">{{ info.desc }}</div>
    <MetricRow id="m-type" label="天体类型" :value="info.type" />
    <MetricRow id="m-diameter" label="直径" :value="info.diameter" />
    <MetricRow id="m-axis" label="轨道半长轴" :value="info.axis" />
    <MetricRow id="m-rotation" label="自转周期" :value="info.rotation" />
    <MetricRow id="m-orbit" label="公转周期" :value="info.orbit" />
    <MetricRow id="m-temp" label="表面温度" :value="info.temp" />
    <MetricRow id="m-moons" label="已知卫星" :value="info.moons" />
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useSolarisStore } from '../stores/solaris.js'
import { buildInfo } from '../utils/format.js'
import MetricRow from './MetricRow.vue'

const store = useSolarisStore()
const info = computed(() => buildInfo(store.selectedDef))
</script>
