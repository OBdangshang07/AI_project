<script setup lang="ts">
/**
 * 逐字采样出场：每个字符先在候选字之间闪变，到点后「确定」为本字，
 * 并闪过一次朱砂——文字不是淡入的，是被决定下来的。
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { store } from '../store'
import { FLICK_POOL } from '../copy'

const props = withDefaults(
  defineProps<{
    text: string
    active?: boolean
    delay?: number
    charMs?: number
    tag?: string
  }>(),
  { active: false, delay: 0, charMs: 30, tag: 'span' }
)

interface CS {
  cur: string
  done: boolean
}

const chars = ref<CS[]>([])
let iv: ReturnType<typeof setInterval> | null = null

const jit = (i: number) => Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1)

function build() {
  chars.value = Array.from(props.text).map((c) => ({
    cur: c,
    done: store.reduced || /\s/.test(c),
  }))
}

function stop() {
  if (iv) {
    clearInterval(iv)
    iv = null
  }
}

function start() {
  stop()
  build()
  if (store.reduced) return
  const t0 = performance.now() + props.delay
  iv = setInterval(() => {
    const now = performance.now()
    const arr = chars.value
    const src = Array.from(props.text)
    for (let i = 0; i < arr.length; i++) {
      const c = arr[i]
      if (/\s/.test(src[i])) {
        c.done = true
        continue
      }
      const settle = t0 + i * props.charMs + jit(i) * props.charMs * 5
      if (!c.done) {
        if (now < settle) {
          if (Math.random() < 0.6) c.cur = FLICK_POOL[(Math.random() * FLICK_POOL.length) | 0]
        } else {
          c.cur = src[i]
          c.done = true
        }
      }
    }
    if (arr.every((c) => c.done)) stop()
  }, 42)
}

watch(
  () => props.active,
  (v) => {
    if (v) start()
  },
  { immediate: true }
)

watch(
  () => props.text,
  () => {
    if (props.active) start()
  }
)

onBeforeUnmount(stop)

build()
</script>

<template>
  <component :is="tag" class="sampled">
    <span class="sr-only">{{ text }}</span>
    <span v-for="(c, i) in chars" :key="i" class="ch" :class="{ done: c.done }" aria-hidden="true">{{
      c.cur
    }}</span>
  </component>
</template>
