<script setup>
import { ref } from 'vue'

const sceneHost = ref(null)
const labelHost = ref(null)

defineExpose({ sceneHost, labelHost })
</script>

<template>
  <div id="scene" ref="sceneHost"></div>
  <div id="labelLayer" ref="labelHost"></div>
  <div id="vignette"></div>
</template>
