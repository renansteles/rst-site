<script setup>
import { useI18n } from '../../i18n'

// O rótulo mostra o idioma de DESTINO (em PT aparece "EN", e vice-versa)
const { t, toggle } = useI18n()
</script>

<template>
  <button class="toggle" type="button" :aria-label="t('locale.switchTo')" :title="t('locale.switchTo')" @click="toggle">
    {{ t('locale.short') }}
  </button>
</template>

<style scoped>
.toggle {
  display: inline-grid;
  place-items: center;
  height: 2.25rem;
  padding-inline: var(--space-3);
  margin-left: var(--space-2);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  transition:
    color var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    transform var(--duration-fast) var(--ease-impact);
}
.toggle:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
  transform: scale(1.06);
}
.toggle:active { transform: scale(0.96); }
</style>
