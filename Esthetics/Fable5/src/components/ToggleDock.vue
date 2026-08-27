<script setup lang="ts">
import { dock } from '../content/copy'
import { toggleCalm, toggleSound, ui } from '../store'
</script>

<template>
  <div class="dock">
    <button :aria-label="dock.soundLabel" :aria-pressed="ui.sound" @click="toggleSound">
      <b>{{ ui.sound ? dock.soundOn : dock.soundOff }}</b>
    </button>
    <button :aria-label="dock.motionLabel" :aria-pressed="!ui.calm" @click="toggleCalm">
      <b>{{ ui.calm ? dock.motionOff : dock.motionOn }}</b>
    </button>
  </div>
</template>
