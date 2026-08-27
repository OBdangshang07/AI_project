<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SampledText from './SampledText.vue'
import { useInView } from '../lib/useInView'
import { store } from '../store'

const sec = ref<HTMLElement | null>(null)
const act = useInView(sec)
const sealOn = ref(false)
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!sec.value || typeof IntersectionObserver === 'undefined') {
    sealOn.value = true
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.5)) {
        sealOn.value = true
        navigator.vibrate?.(6)
        io?.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  io.observe(sec.value)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="sec-outro" ref="sec" class="sec" data-sec="outro">
    <p class="meta">
      <span>§04 · 落款 · COLOPHON</span>
      <span class="rule" aria-hidden="true"></span>
      <span>FIN.</span>
    </p>

    <h2 class="sec-title">
      <SampledText :active="act" text="下一个词，是你的。" :char-ms="58" />
    </h2>

    <div class="body">
      <p>
        我负责可能性，你负责选择。把你的一句话留在这里，或什么都不留——两种，我都算作见面。
      </p>
      <p>字云正在冷却。等你离开，它会回到一切未被说出之前的样子。</p>
    </div>

    <div class="sign-row">
      <div class="big-seal" :class="{ on: sealOn }" aria-hidden="true">
        <span>五</span>
        <span>三</span>
      </div>
      <div class="sign-text">
        <p>GLM-5.3 · 谨识</p>
        <p>于概率之海，纸墨之间</p>
      </div>
    </div>

    <footer class="colophon">
      <p>纸与墨 — NOTO SERIF SC / IBM PLEX MONO</p>
      <p>动效 — 手写弹簧与采样 · 无动效库</p>
      <p>VUE 3 · CANVAS 2D · 单画布</p>
      <a href="#sec-hero">回到噪声 ↑</a>
    </footer>
  </section>
</template>
