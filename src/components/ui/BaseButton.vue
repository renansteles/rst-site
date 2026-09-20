<script setup>
/**
 * Botão reutilizável. Renderiza <RouterLink> se receber `to`,
 * <a> se receber `href`, ou <button> caso contrário.
 * variant: 'primary' (preenchido com accent) | 'ghost' (contorno)
 */
defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' },
})
</script>

<template>
  <RouterLink v-if="to" :to="to" class="btn" :class="`btn--${variant}`">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" class="btn" :class="`btn--${variant}`" target="_blank" rel="noopener">
    <slot />
  </a>
  <button v-else type="button" class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.7rem 1.4rem;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition:
    transform var(--duration-fast) var(--ease-impact),
    box-shadow var(--duration-fast) var(--ease-impact),
    background-color var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    color var(--duration-fast) ease;
}

/* "Impacto controlado": leve subida + sombra no hover, recuo no clique */
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0) scale(0.98); }

.btn--primary {
  background: var(--color-accent);
  color: var(--color-accent-contrast);
}
.btn--primary:hover {
  background: var(--color-accent-hover);
  color: var(--color-accent-contrast);
  box-shadow: var(--shadow-accent);
}

.btn--ghost {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}
.btn--ghost:hover {
  color: var(--color-text);
  border-color: var(--color-text);
  box-shadow: var(--shadow-md);
}
</style>
