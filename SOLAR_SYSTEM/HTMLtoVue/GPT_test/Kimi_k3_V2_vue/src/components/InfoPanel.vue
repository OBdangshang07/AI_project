<script setup>
const metrics = [
  ['iv_type', '类型'],
  ['iv_dia', '直径'],
  ['iv_sma', '轨道半长轴'],
  ['iv_rot', '自转周期'],
  ['iv_per', '公转周期'],
  ['iv_tmp', '表面温度'],
  ['iv_moon', '已知卫星'],
]
</script>

<template>
  <section id="infoPanel" class="glass">
    <h3 id="infoName">太阳系</h3>
    <div id="infoSub">单击任意天体查看详情 · 双击聚焦</div>
    <div id="infoRows">
      <div v-for="([id, label]) in metrics" :key="id" class="irow">
        <span>{{ label }}</span><b :id="id">—</b>
      </div>
    </div>
  </section>
</template>
