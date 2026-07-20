<template>
  <div class="searchbox" ref="rootEl">
    <input id="search" autocomplete="off" placeholder="搜索天体 / Search" v-model="q" @input="runSearch" />
    <div id="search-results" class="glass" :style="{ display: showResults ? 'block' : 'none' }">
      <template v-if="results.length">
        <div v-for="r in results" :key="r.id" class="result" @click="pick(r)">{{ r.cn }} · {{ r.en }}<span>{{ r.type }}</span></div>
      </template>
      <div v-else class="result">未找到匹配天体</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSolarisStore } from '../stores/solaris.js'

const store = useSolarisStore()
const rootEl = ref(null)
const q = ref('')
const results = ref([])
const showResults = ref(false)

function runSearch() {
  if (!q.value.trim()) { showResults.value = false; return }
  results.value = store.search(q.value)
  showResults.value = true // 无结果时也展示「未找到匹配天体」，与原版一致
}

function pick(r) {
  store.selectAndFocus(r.id)
  q.value = `${r.cn} · ${r.en}`
  showResults.value = false
}

// 点击搜索框外部 → 收起结果（与原行为一致）
function onGlobalPointerDown(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) showResults.value = false
}

onMounted(() => document.addEventListener('pointerdown', onGlobalPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onGlobalPointerDown))
</script>
