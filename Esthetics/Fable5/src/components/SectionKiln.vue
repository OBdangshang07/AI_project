<script setup lang="ts">
import { computed } from 'vue'
import TagPanel from './TagPanel.vue'
import { kiln } from '../content/copy'
import { engine, ui } from '../store'
import type { NarrationKey } from '../studio/types'

const order: Exclude<NarrationKey, null>[] = ['enter', 'fire', 'crack', 'still', 'gold', 'mended', 'crazing']

const lineClass = computed(() => {
  const k = ui.narration
  if (k === 'crack' || k === 'still') return 'crack'
  if (k === 'gold' || k === 'mended') return 'gold'
  return ''
})

function openGold(): void {
  ui.goldNoteOpen = !ui.goldNoteOpen
  if (ui.goldNoteOpen) engine.pulseGold()
}
</script>

<template>
  <section class="chapter ch-kiln" aria-labelledby="h-kiln">
    <div class="chapter-inner">
      <TagPanel :ch="3" tilt="l">
        <h2 id="h-kiln">
          {{ kiln.name }}<span class="latin">{{ kiln.latin }}</span>
        </h2>
        <p>{{ kiln.lead }}</p>

        <div v-if="!ui.calm" class="narration" aria-live="polite">
          <p v-if="ui.narration" class="n-line" :class="lineClass">{{ kiln.narration[ui.narration] }}</p>
          <button v-if="ui.kilnRunning" class="skip-link" @click="engine.skipKiln()">{{ kiln.skip }}</button>
        </div>
        <div v-else-if="ui.chapter >= 3 || ui.kilnDone" class="narration-static">
          <p v-for="k in order" :key="k">{{ kiln.narration[k] }}</p>
        </div>
      </TagPanel>

      <TagPanel v-if="ui.kilnDone" tilt="r">
        <button class="thread-btn gold" :aria-expanded="ui.goldNoteOpen" @click="openGold">
          {{ kiln.crackBtn }}
        </button>
        <p v-if="ui.goldNoteOpen" class="gold-note">{{ kiln.crackNote }}</p>
      </TagPanel>
    </div>
  </section>
</template>
