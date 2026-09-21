<script setup>
import BaseButton from '../components/ui/BaseButton.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <div class="container notfound">
    <span class="eyebrow">{{ t('notFound.eyebrow') }}</span>
    <h1 class="notfound__title">{{ t('notFound.title') }}<span class="dot">.</span></h1>
    <p class="muted">{{ t('notFound.text') }}</p>
    <div class="notfound__actions">
      <BaseButton to="/">{{ t('notFound.home') }}</BaseButton>
      <BaseButton to="/blog" variant="ghost">{{ t('notFound.blog') }}</BaseButton>
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
