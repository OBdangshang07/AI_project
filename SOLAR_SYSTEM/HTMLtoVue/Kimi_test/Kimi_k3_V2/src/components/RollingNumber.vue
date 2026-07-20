<template>
  <span>{{ display }}</span>
</template>

<script setup>
/* 数值滚动动画（复刻原版 rollNum：450ms easeInOut，从上一个目标值起跳） */
import { ref, watch, onBeforeUnmount } from 'vue'
import { fmtInt, easeIO } from '../engine/math.js'

const props = defineProps({
  value: { type: [Number, String], default: null }, // Number=滚动动画；String/null=直接显示
  suffix: { type: String, default: '' },
})

const display = ref('—')
let prevTarget = 0
let raf = 0

watch(() => [props.value, props.suffix], () => {
  cancelAnimationFrame(raf)
  const to = props.value
  if (typeof to !== 'number') {
    display.value = (to === null || to === undefined) ? '—' : to
    return
  }
  const from = prevTarget
  prevTarget = to
  const t0 = performance.now()
  const step = now => {
    const t = Math.min(1, (now - t0) / 450)
    display.value = fmtInt(from + (to - from) * easeIO(t)) + props.suffix
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}, { immediate: true })

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>
