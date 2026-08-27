<script setup lang="ts">
import { hero } from '../content/copy'
</script>

<template>
  <section class="chapter ch-hero" aria-labelledby="h-hero">
    <div class="hero">
      <h1 id="h-hero" class="hero-title">
        {{ hero.title }}<span class="seal" aria-hidden="true">{{ hero.seal }}</span>
      </h1>
      <p class="hero-sub">{{ hero.sub }}</p>
      <p class="hero-latin">{{ hero.latin }}</p>
      <div class="hero-stage" aria-hidden="true"></div>
      <p class="hero-intro">{{ hero.intro }}</p>
      <p class="hero-hint">{{ hero.hint }} ↓</p>
    </div>
  </section>
</template>
