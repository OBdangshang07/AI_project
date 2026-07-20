<template>
  <div id="searchWrap" class="glass" ref="rootEl">
    <input id="searchInput" type="text" placeholder="搜索天体（中文 / English）…" autocomplete="off"
      v-model="q" @input="runSearch" @keydown="onKeydown">
    <div id="searchResults" :style="{ display: showResults ? 'block' : 'none' }">
      <div v-for="r in results" :key="r.id" class="sr" @pointerdown.prevent="pick(r)">
        <span>{{ r.name }}</span><span class="en">{{ r.en }} · {{ r.cat }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSolarStore } from '../stores/solar.js'

const store = useSolarStore()
const rootEl = ref(null)
const q = ref('')
const results = ref([])
const showResults = ref(false)

function runSearch() {
  if (!q.value.trim()) { showResults.value = false; return }
  results.value = store.search(q.value)
  showResults.value = results.value.length > 0
}

function pick(r) {
  showResults.value = false
  q.value = r.name
  store.selectAndFocus(r.id)
}

function onKeydown(ev) {
  if (ev.key === 'Enter' && results.value.length) pick(results.value[0])
}

// 点击搜索框外部 / 按 Esc → 收起结果（与原行为一致）
function onGlobalPointerDown(ev) {
  if (rootEl.value && !rootEl.value.contains(ev.target)) showResults.value = false
}
function onGlobalKeyDown(ev) {
  if (ev.key === 'Escape') showResults.value = false
}

onMounted(() => {
  window.addEventListener('pointerdown', onGlobalPointerDown)
  window.addEventListener('keydown', onGlobalKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', onGlobalPointerDown)
  window.removeEventListener('keydown', onGlobalKeyDown)
})
</script>
