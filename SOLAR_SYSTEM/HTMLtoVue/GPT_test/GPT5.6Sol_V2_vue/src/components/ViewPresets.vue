<script setup>
const views = [
  ['overview', '太阳系全景'],
  ['inner', '内太阳系'],
  ['jupiter', '木星系统'],
  ['saturn', '土星系统'],
  ['pluto', '冥王星特写'],
  ['distant', '远日天体'],
]
</script>

<template>
  <nav id="presets" class="glass" aria-label="预设视角">
    <button v-for="([view, label]) in views" :key="view" :data-view="view">{{ label }}</button>
  </nav>
</template>
