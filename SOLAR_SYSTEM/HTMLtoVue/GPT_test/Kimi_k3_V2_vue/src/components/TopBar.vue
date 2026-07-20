<script setup>
const initialDateTime = '2024-01-01 00:00 UTC'
</script>

<template>
  <div id="topbar">
    <div id="datetime" class="glass">{{ initialDateTime }}</div>
    <div id="searchWrap" class="glass">
      <input id="searchInput" type="text" placeholder="搜索天体（中文 / English）…" autocomplete="off" />
      <div id="searchResults"></div>
    </div>
  </div>
</template>
