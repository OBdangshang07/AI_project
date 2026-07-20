<template>
  <div class="metric"><label>{{ label }}</label><b :id="id" ref="bEl">{{ value }}</b></div>
</template>

<script setup>
/* 复刻原版 setMetric 的 Web Animations 更新动效（330ms 上浮淡入） */
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, default: '—' },
})

const bEl = ref(null)
function animate() {
  bEl.value?.animate(
    [{ opacity: .1, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }],
    { duration: 330, easing: 'ease-out' })
}
onMounted(animate) // 启动时 showInfo(null) 也会触发一次动效，与原版一致
watch(() => props.value, animate)
</script>
