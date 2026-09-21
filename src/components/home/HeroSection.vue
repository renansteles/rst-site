<script setup>
import BaseButton from '../ui/BaseButton.vue'
import { profile } from '../../content/profile'
</script>

<template>
  <section class="hero texture">
    <div class="container hero__inner">
      <span class="eyebrow hero__eyebrow">{{ profile.role }}</span>

      <h1 class="hero__title">
        {{ profile.name }}<span class="hero__dot">.</span>
      </h1>

      <p class="hero__tagline">{{ profile.tagline }}</p>
      <p class="hero__bio muted">{{ profile.bio }}</p>

      <div class="hero__actions">
        <BaseButton to="/blog">Ler o blog</BaseButton>
        <BaseButton to="#contato" variant="ghost">Contato</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  /* topo menor: aproxima o conteúdo da navbar; base mantém o respiro até a timeline */
  padding-block: var(--space-8) var(--space-12);
  overflow: hidden;
}

@media (min-width: 768px) {
  .hero { padding-block: var(--space-12) var(--space-16); }
}

.hero__inner {
  max-width: var(--container-max);
}

.hero__eyebrow {
  display: block;
  margin-bottom: var(--space-4);
}

.hero__title {
  margin-bottom: var(--space-6);
}

/* Ponto final em vermelho: assinatura discreta da paleta */
.hero__dot { color: var(--color-accent); }

.hero__tagline {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  font-weight: 500;
  line-height: 1.3;
  max-width: 34ch;
  margin-bottom: var(--space-4);
}

.hero__bio {
  max-width: 60ch;
  white-space: pre-line; /* respeita as quebras de linha do profile.js */
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
