<script setup>
import BaseButton from '../components/ui/BaseButton.vue'
</script>

<template>
  <div class="container notfound">
    <span class="eyebrow">Erro 404</span>
    <h1 class="notfound__title">Nada por aqui<span class="dot">.</span></h1>
    <p class="muted">A página que você procura não existe ou foi movida.</p>
    <div class="notfound__actions">
      <BaseButton to="/">Voltar ao início</BaseButton>
      <BaseButton to="/blog" variant="ghost">Ver o blog</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.notfound {
  padding-block: var(--space-24);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.notfound__title { font-size: clamp(2rem, 5vw, 3rem); }
.dot { color: var(--color-accent); }
.notfound__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
</style>
