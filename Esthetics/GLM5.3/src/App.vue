<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import GlyphCanvas from './components/GlyphCanvas.vue'
import SideRail from './components/SideRail.vue'
import HeroSec from './components/HeroSec.vue'
import ContextSec from './components/ContextSec.vue'
import TempSec from './components/TempSec.vue'
import CollapseSec from './components/CollapseSec.vue'
import OutroSec from './components/OutroSec.vue'
import SampledText from './components/SampledText.vue'
import { field } from './field'
import { store } from './store'
import { SECTIONS, FONT_PRELOAD } from './copy'

/** 章节驱动的字云目标态：整站是一具连续演化的身体 */
const SEC_TARGET: Record<string, () => [number, number]> = {
  hero: () => [0.55, 0.16],
  context: () => [0.3, 0.62],
  temp: () => [store.tempSlider, 0.3],
  collapse: () => [0.62, 0.1],
  outro: () => [0.08, 0.45],
}

watch(
  () => store.section,
  (id) => {
    const f = SEC_TARGET[id]
    if (f) field.setTarget(...f())
  }
)

watch(
  () => store.tempSlider,
  (v) => {
    if (store.section === 'temp') field.setTarget(v, 0.3)
  }
)

const secName = computed(
  () => SECTIONS.find((s) => s.id === store.section) ?? SECTIONS[0]
)

let spy: IntersectionObserver | null = null
let mqRed: MediaQueryList | null = null

onMounted(() => {
  mqRed = window.matchMedia('(prefers-reduced-motion: reduce)')
  store.reduced = mqRed.matches
  field.setReduced(store.reduced)
  mqRed.addEventListener('change', (e) => {
    store.reduced = e.matches
    field.setReduced(e.matches)
  })
  store.coarse = window.matchMedia('(pointer: coarse)').matches

  const apply = SEC_TARGET[store.section]
  if (apply) field.setTarget(...apply())

  spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).dataset.sec
          if (id) store.section = id as typeof store.section
        }
      }
    },
    { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
  )
  document.querySelectorAll('main section[data-sec]').forEach((el) => spy!.observe(el))
})

onBeforeUnmount(() => {
  spy?.disconnect()
  mqRed = null
})
</script>

<template>
  <a class="skip" href="#main">跳到正文</a>

  <GlyphCanvas />
  <div class="grain" aria-hidden="true"></div>

  <header class="hud" aria-hidden="true">
    <p>下一个词 · GLM-5.3</p>
    <p class="hud-r">
      {{ secName.n }} {{ secName.name }} · τ {{ store.liveTemp.toFixed(2) }}
    </p>
  </header>

  <SideRail />

  <main id="main">
    <HeroSec />
    <ContextSec />
    <TempSec />
    <CollapseSec />
    <OutroSec />
  </main>

  <transition name="still-fade">
    <p v-if="store.still" class="still-cap">
      <SampledText :active="true" text="你安静的时候，我也在看你。" :char-ms="60" />
    </p>
  </transition>

  <!-- 触发 Canvas 所需的 webfont 分片加载 -->
  <div class="font-preload" aria-hidden="true">
    <span :data-w="400">{{ FONT_PRELOAD }}</span>
    <span :data-w="600">{{ FONT_PRELOAD }}</span>
    <span :data-w="900">{{ FONT_PRELOAD }}</span>
  </div>
</template>

<style scoped>
.still-fade-enter-active {
  transition: opacity 0.6s ease;
}

.still-fade-leave-active {
  transition: opacity 0.25s ease;
}

.still-fade-enter-from,
.still-fade-leave-to {
  opacity: 0;
}

.font-preload span[data-w='400'] {
  font-weight: 400;
}

.font-preload span[data-w='600'] {
  font-weight: 600;
}

.font-preload span[data-w='900'] {
  font-weight: 900;
}
</style>
