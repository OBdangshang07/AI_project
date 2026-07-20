<script setup>
const presets = [
  ['overview', '太阳系全景'],
  ['inner', '内太阳系'],
  ['jupiter', '木星系统'],
  ['saturn', '土星系统'],
  ['pluto', '冥王星特写'],
]
</script>

<template>
  <nav id="presets" aria-label="预设视角">
    <button v-for="([preset, label]) in presets" :key="preset" :data-p="preset">{{ label }}</button>
  </nav>
</template>
