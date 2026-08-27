<script setup lang="ts">
import { computed } from 'vue'
import TagPanel from './TagPanel.vue'
import { vessel } from '../content/copy'
import { engine, ui } from '../store'
import { exportVesselPNG, vesselNumber } from '../studio/exporter'

const dateStr = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

const no = computed(() => (ui.cut ? vesselNumber(engine.exportState()) : 0))

const ratioLine = computed(() =>
  ui.stats.touches === 0
    ? vessel.colophon.allMine
    : vessel.colophon.touches(ui.stats.touches, ui.stats.passes),
)

function save(): void {
  exportVesselPNG(engine, dateStr.value)
}
</script>

<template>
  <section class="chapter ch-vessel" aria-labelledby="h-vessel">
    <div class="chapter-inner">
      <TagPanel :ch="4" tilt="l">
        <h2 id="h-vessel">
          {{ vessel.name }}<span class="latin">{{ vessel.latin }}</span>
        </h2>
        <p>{{ vessel.lead }}</p>
        <p class="hint">
          <button class="thread-btn" :aria-pressed="ui.sectionOpen" @click="engine.openSection(!ui.sectionOpen)">
            看剖面
          </button>
        </p>
      </TagPanel>

      <TagPanel tilt="r">
        <template v-if="!ui.cut">
          <p>{{ vessel.cutLead }}</p>
          <p class="cut-row">
            <button class="thread-btn" :disabled="!ui.kilnDone" @click="engine.cutOff()">
              {{ vessel.cutBtn }}
            </button>
          </p>
        </template>
        <div v-else class="colophon colophon-card">
          <p class="colophon-title">
            {{ vessel.colophon.title }} <span class="no">No. {{ no }}</span>
          </p>
          <p>{{ vessel.colophon.date(dateStr) }}</p>
          <p>{{ ratioLine }}</p>
          <p v-if="ui.stats.cracked">{{ vessel.colophon.crack }}</p>
          <p class="soft after-cut">{{ vessel.afterCut }}</p>
          <p class="save-row">
            <button class="thread-btn" @click="save">{{ vessel.saveBtn }}</button>
          </p>
          <span class="seal" aria-hidden="true">器</span>
        </div>
      </TagPanel>
    </div>
  </section>
</template>
