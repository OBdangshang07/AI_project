<script setup>
const overlays = ['tourBar', 'measureBox']
</script>

<template>
  <div v-for="id in overlays" :id="id" :key="id" class="glass"></div>
</template>
