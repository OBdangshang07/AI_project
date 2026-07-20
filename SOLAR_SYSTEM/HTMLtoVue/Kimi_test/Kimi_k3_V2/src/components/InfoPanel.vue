<template>
  <div id="infoPanel" class="glass">
    <h3 id="infoName">{{ d ? d.name : '太阳系' }}</h3>
    <div id="infoSub">{{ d ? d.en + ' · ' + d.cat : '单击任意天体查看详情 · 双击聚焦' }}</div>
    <div id="infoRows">
      <div class="irow"><span>类型</span><b id="iv_type">{{ d ? d.cat : '—' }}</b></div>
      <div class="irow"><span>直径</span><b id="iv_dia"><RollingNumber :value="diaValue" suffix=" km" /></b></div>
      <div class="irow"><span>轨道半长轴</span><b id="iv_sma"><RollingNumber :value="smaValue" :suffix="smaSuffix" /></b></div>
      <div class="irow"><span>自转周期</span><b id="iv_rot">{{ d ? fmtRot(d) : '—' }}</b></div>
      <div class="irow"><span>公转周期</span><b id="iv_per">{{ d ? fmtPeriod(d.per) : '—' }}</b></div>
      <div class="irow"><span>表面温度</span><b id="iv_tmp">{{ d && d.temp ? d.temp : '—' }}</b></div>
      <div class="irow"><span>已知卫星</span><b id="iv_moon">{{ d ? (d.moons !== undefined ? String(d.moons) : '—') : '—' }}</b></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSolarStore } from '../stores/solar.js'
import { fmtRot, fmtPeriod } from '../utils/format.js'
import RollingNumber from './RollingNumber.vue'

const store = useSolarStore()
const d = computed(() => store.selectedDef)

const diaValue = computed(() => {
  if (!d.value) return null
  return typeof d.value.km === 'number' ? d.value.km : (d.value.km ?? '—')
})
const smaValue = computed(() => {
  if (!d.value) return null
  if (d.value.au !== undefined) return d.value.au
  if (d.value.smaKm !== undefined) return d.value.smaKm
  return d.value.smaText ?? '—'
})
const smaSuffix = computed(() => {
  if (!d.value) return ''
  if (d.value.au !== undefined) return ' AU'
  if (d.value.smaKm !== undefined) return ' km'
  return ''
})
</script>
