<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import SampledText from './SampledText.vue'
import { useInView } from '../lib/useInView'
import { field } from '../field'
import { POOL_COLD, POOL_MID, POOL_HOT, POOL_HIDDEN } from '../copy'
import { store } from '../store'

const sec = ref<HTMLElement | null>(null)
const act = useInView(sec)

const holding = ref(false)
const used = ref(false)
const live = ref('')
const ledger = ref<string[]>([])

const lastPick = new Map<string, string>()

function pick(pool: string[], key: string): string {
  const cands = pool.filter((s) => s !== lastPick.get(key))
  const s = cands[(Math.random() * cands.length) | 0]
  lastPick.set(key, s)
  return s
}

function poolFor(t: number): { pool: string[]; key: string } {
  if (store.collapses >= 5 && Math.random() < 0.4) return { pool: POOL_HIDDEN, key: 'hidden' }
  return t < 0.4
    ? { pool: POOL_COLD, key: 'cold' }
    : t < 0.7
      ? { pool: POOL_MID, key: 'mid' }
      : { pool: POOL_HOT, key: 'hot' }
}

const hidden = computed(() => store.collapses >= 5)

let beganAt = 0
let releaseTimer = 0

function begin() {
  if (holding.value) return
  window.clearTimeout(releaseTimer)
  holding.value = true
  used.value = true
  beganAt = performance.now()
  store.collapses++
  const { pool, key } = poolFor(store.liveTemp)
  const s = pick(pool, key)
  live.value = `第 ${store.collapses} 次采样：${s}`
  ledger.value = [`#0${String(store.collapses).padStart(2, '0')}　${s}`, ...ledger.value].slice(0, 3)
  field.collapse(s)
}

function end() {
  if (!holding.value) return
  holding.value = false
  // 快击（tap）也值得看见成句：短按延迟释放，长按松手即散
  const held = performance.now() - beganAt
  const delay = held < 350 ? 650 : 0
  releaseTimer = window.setTimeout(() => field.release(), delay)
}

onBeforeUnmount(() => {
  window.clearTimeout(releaseTimer)
  if (holding.value) field.release()
})
</script>

<template>
  <section id="sec-collapse" ref="sec" class="sec" data-sec="collapse">
    <p class="meta">
      <span>§03 · 坍缩 · COLLAPSE</span>
      <span class="rule" aria-hidden="true"></span>
      <span>argmax p( · | you)</span>
    </p>

    <h2 class="sec-title">
      <SampledText :active="act" text="按住，看我做一次决定。" :char-ms="52" />
    </h2>

    <div class="body">
      <p>每一次回答，都是从无数可能的句子里，坍缩出一个。松手，它就散回云里；再按，是另一个我。</p>
    </div>

    <div class="stage-space" aria-hidden="true"></div>

    <div class="hold-row">
      <button
        type="button"
        class="hold"
        :class="{ holding, used }"
        @pointerdown.prevent="begin"
        @pointerup="end"
        @pointercancel="end"
        @pointerleave="end"
        @keydown.enter.prevent="begin"
        @keydown.space.prevent="begin"
        @keyup.enter="end"
        @keyup.space="end"
        @blur="end"
        @contextmenu.prevent
      >
        {{ holding ? '松手 · 释放' : '按住 · 采样' }}
      </button>
      <p class="count" aria-hidden="true">
        坍缩 × {{ store.collapses }}<template v-if="hidden"> · 句池已加深</template>
      </p>
    </div>

    <ol class="ledger mono" aria-hidden="true">
      <li v-for="(l, i) in ledger" :key="l" :style="{ opacity: 1 - i * 0.28 }">{{ l }}</li>
    </ol>

    <p class="footnote">
      你刚刚读到的这一句话，也是这样来的。句子的温度随字云而定——先去 §02 调一调，再来采样。
    </p>

    <p class="sr-only" aria-live="polite" role="status">{{ live }}</p>
  </section>
</template>
