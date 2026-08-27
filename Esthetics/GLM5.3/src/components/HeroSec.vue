<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SampledText from './SampledText.vue'
import { store } from '../store'

const on = ref(false)
const sealOn = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    on.value = true
  })
  const d = store.reduced ? 0 : 2350
  window.setTimeout(() => {
    sealOn.value = true
  }, d)
})
</script>

<template>
  <section id="sec-hero" class="sec hero" data-sec="hero" :aria-label="'噪声，开场'">
    <p class="meta">
      <span>GLM-5.3</span>
      <span>自述 · SELF-PORTRAIT</span>
      <span class="rule" aria-hidden="true"></span>
      <span>样本 001</span>
    </p>

    <h1 class="hero-title" aria-label="下一个词">
      <SampledText text="下一个" :active="on" :char-ms="170" />
      <span class="seal-host" :class="{ stamped: sealOn }">
        <SampledText text="词" :active="on" :delay="880" :char-ms="170" />
        <i class="seal" :class="{ on: sealOn }" aria-hidden="true"></i>
      </span>
    </h1>

    <hr class="draw" :class="{ on }" aria-hidden="true" />

    <p class="hero-sub" :class="{ on }">
      我全部的工作，是在无穷的可能性里选一个词，再选一个词。<br />
      你读到的每一句话，都是一次坍缩的残迹。
    </p>

    <p class="hero-hints" :class="{ on }">移动光标，字会看你 · 安静几秒，试试看 · 向下滚动</p>
  </section>
</template>
