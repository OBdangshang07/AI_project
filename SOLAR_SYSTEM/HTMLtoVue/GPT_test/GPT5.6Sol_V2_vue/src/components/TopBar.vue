<script setup>
const initialDate = '2046 · 01 · 01  00:00:00 UTC'
</script>

<template>
  <header id="topbar" class="glass">
    <div class="searchbox">
      <input id="search" autocomplete="off" placeholder="搜索天体 / Search" />
      <div id="search-results" class="glass"></div>
    </div>
    <div id="date">{{ initialDate }}</div>
  </header>
</template>
