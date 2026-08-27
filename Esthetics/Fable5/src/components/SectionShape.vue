<script setup lang="ts">
import type { CSSProperties } from 'vue'
import TagPanel from './TagPanel.vue'
import { shape } from '../content/copy'
import { engine, ui } from '../store'

function stateOf(id: string): string {
  const s = ui.qState[id]
  return s === 'done' ? 'done' : s === 'active' ? 'active' : ''
}
function stateText(id: string): string {
  const s = ui.qState[id]
  return s === 'done' ? '已成形' : s === 'active' ? '转着……' : ''
}
function disabledQ(id: string): boolean {
  if (!ui.splatted || ui.kilnDone || ui.kilnRunning) return true
  if (ui.qState[id] === 'done') return true
  return Object.values(ui.qState).includes('active')
}
function ask(id: string): void {
  engine.startQuestion(id)
}

function lineStyle(id: string, li: number): CSSProperties {
  const p = ui.reveals[id]?.[li] ?? 0
  if (p >= 1) return {}
  const pct = `${((1 - p) * 100).toFixed(1)}%`
  return {
    clipPath: li % 2 === 0 ? `inset(0 ${pct} 0 0)` : `inset(0 0 0 ${pct})`,
  }
}

function hold(b: boolean): void {
  engine.setHold(b)
}
function kd(e: KeyboardEvent): void {
  if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
    e.preventDefault()
    engine.setHold(true)
  }
}
function ku(e: KeyboardEvent): void {
  if (e.key === ' ' || e.key === 'Enter') engine.setHold(false)
}
</script>

<template>
  <section class="chapter ch-shape" aria-labelledby="h-shape">
    <div class="chapter-inner">
      <TagPanel :ch="2" tilt="l">
        <h2 id="h-shape">
          {{ shape.name }}<span class="latin">{{ shape.latin }}</span>
        </h2>
        <p>{{ shape.lead }}</p>
        <p class="hint">
          {{ shape.dragHint }}<template v-if="ui.showHoldHint"> {{ shape.holdHint }}</template>
        </p>
        <p v-if="ui.sectionOpen" class="soft">{{ shape.sectionNote }}</p>
      </TagPanel>

      <TagPanel tilt="r">
        <ul class="questions">
          <li v-for="q in shape.questions" :key="q.id" class="q-item" :class="stateOf(q.id)">
            <button class="q-btn" :disabled="disabledQ(q.id)" @click="ask(q.id)">
              <span>{{ q.q }}</span>
              <span class="state">{{ stateText(q.id) }}</span>
            </button>
          </li>
        </ul>

        <p v-if="ui.awaitingHold" class="duet-line">
          <span :class="{ soft: !ui.duetPaused }">{{ ui.duetPaused ? shape.duetWait : shape.duetPrompt }}</span>
          <button
            class="thread-btn hold-btn"
            @pointerdown.prevent="hold(true)"
            @pointerup="hold(false)"
            @pointercancel="hold(false)"
            @pointerleave="hold(false)"
            @keydown="kd"
            @keyup="ku"
          >
            按住这里
          </button>
          <span class="soft kbd-note">{{ shape.duetKeyboard }}</span>
        </p>

        <div class="answers">
          <div
            v-for="q in shape.questions"
            v-show="(ui.reveals[q.id]?.[0] ?? 0) > 0.01"
            :key="q.id"
            class="answer"
          >
            <div class="a-q">{{ q.q }}</div>
            <span v-for="(ln, li) in q.lines" :key="li" class="a-line" :style="lineStyle(q.id, li)">{{ ln }}</span>
          </div>
        </div>

        <div class="make-status">
          <span>{{ shape.statusTouches(ui.stats.touches) }}</span>
          <span>{{ shape.statusPasses(ui.stats.passes) }}</span>
          <button
            class="thread-btn"
            :disabled="!ui.splatted || ui.kilnRunning || ui.kilnDone"
            @click="engine.rewind()"
          >
            {{ shape.rewindBtn }}
          </button>
        </div>
        <p v-if="ui.rewindEmpty" class="soft">{{ shape.rewindEmpty }}</p>
        <p v-if="ui.kilnDone" class="soft">已出窑，形定了。</p>
      </TagPanel>
    </div>
  </section>
</template>
