<script setup lang="ts">
import { ref, watch } from 'vue'
import TagPanel from './TagPanel.vue'
import { center } from '../content/copy'
import { engine, ui } from '../store'

const openIdx = ref<number | null>(null)
const justRecentered = ref(false)
let timer = 0

watch(
  () => ui.recenteredAt,
  () => {
    justRecentered.value = true
    window.clearTimeout(timer)
    timer = window.setTimeout(() => (justRecentered.value = false), 2800)
  },
)

function toggle(i: number): void {
  openIdx.value = openIdx.value === i ? null : i
}
</script>

<template>
  <section class="chapter ch-center" aria-labelledby="h-center">
    <div class="chapter-inner">
      <TagPanel :ch="1" tilt="l">
        <h2 id="h-center">
          {{ center.name }}<span class="latin">{{ center.latin }}</span>
        </h2>
        <p>{{ center.lead }}</p>
        <p class="hint">
          {{ center.push }}
          <button class="thread-btn" :disabled="!ui.splatted || ui.kilnDone" @click="engine.pushDemo()">
            {{ center.pushBtn }}
          </button>
        </p>
        <p v-if="justRecentered" class="soft" aria-live="polite">{{ center.recentered }}</p>
      </TagPanel>

      <TagPanel tilt="r">
        <ol class="principles" @mouseleave="engine.hoverPrinciple(null)">
          <li v-for="(p, i) in center.principles" :key="p.title" :class="{ open: openIdx === i }">
            <button
              class="p-head"
              :aria-expanded="openIdx === i"
              @click="toggle(i)"
              @mouseenter="engine.hoverPrinciple(i)"
              @focus="engine.hoverPrinciple(i)"
              @blur="engine.hoverPrinciple(null)"
            >
              <span class="no">{{ i + 1 }}</span>
              <span class="p-title">{{ p.title }}</span>
            </button>
            <div class="p-body">
              <div><p>{{ p.body }}</p></div>
            </div>
          </li>
        </ol>
      </TagPanel>
    </div>
  </section>
</template>
