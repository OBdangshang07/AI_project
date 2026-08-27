<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SampledText from './SampledText.vue'
import { useInView } from '../lib/useInView'
import { REGISTERS } from '../copy'
import { store } from '../store'

const sec = ref<HTMLElement | null>(null)
const act = useInView(sec)

/** 滞回切换，避免在阈值附近来回抖动 */
const reg = ref(1)
watch(
  () => store.tempSlider,
  (v) => {
    if (v >= 0.62) reg.value = 2
    else if (v <= 0.38) reg.value = 0
    else reg.value = 1
  }
)

const R = computed(() => REGISTERS[reg.value])

const ariaValuetext = computed(() => `${R.value.mode}，τ = ${store.tempSlider.toFixed(2)}`)
</script>

<template>
  <section id="sec-temp" ref="sec" class="sec" data-sec="temp">
    <p class="meta">
      <span>§02 · 温度 · TEMPERATURE</span>
      <span class="rule" aria-hidden="true"></span>
      <span>τ ∈ [0,1]</span>
    </p>

    <h2 class="sec-title" :key="'t' + reg">
      <SampledText :active="true" :text="R.title" :char-ms="46" />
    </h2>
    <p class="mode" :key="'m' + reg">{{ R.mode }}</p>

    <!-- 先动作，后阅读：滑杆是你握着的那个 τ -->
    <div class="slider-row" data-ui>
      <input
        id="t-slider"
        v-model.number="store.tempSlider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        aria-label="温度 τ：控制字云与文案的随机度"
        :aria-valuetext="ariaValuetext"
      />
      <div class="ticks" aria-hidden="true">
        <span>0 · 低温</span>
        <span>0.5</span>
        <span>1 · 高温</span>
      </div>
      <p class="tval" aria-hidden="true">τ = {{ store.tempSlider.toFixed(2) }}</p>
    </div>

    <div class="t-body" :key="'b' + reg">
      <SampledText
        v-for="(l, i) in R.body"
        :key="i"
        :active="act"
        :text="l"
        :delay="i * 420"
        :char-ms="7"
        tag="p"
      />
    </div>

    <p class="cap">你拖的不只是滑杆——是这段话的语气，和整片字云的体温。</p>
  </section>
</template>
