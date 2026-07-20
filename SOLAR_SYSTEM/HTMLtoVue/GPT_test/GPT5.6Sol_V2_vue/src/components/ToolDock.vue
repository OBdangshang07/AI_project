<script setup>
const tools = [
  ['measure', '测距'],
  ['tour', '自动导览'],
  ['follow', '锁定跟随'],
]
</script>

<template>
  <div id="tool-dock" class="glass">
    <button v-for="([id, label]) in tools" :id="id" :key="id">{{ label }}</button>
  </div>
</template>
