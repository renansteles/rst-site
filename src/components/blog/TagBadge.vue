<script setup>
/**
 * Etiqueta de tag. Se `to` for passado, vira um link para o blog filtrado.
 */
defineProps({
  tag: { type: String, required: true },
  active: { type: Boolean, default: false },
  to: { type: [String, Object], default: null },
})
</script>

<template>
  <component :is="to ? 'RouterLink' : 'span'" :to="to" class="tag" :class="{ 'is-active': active }">
    <span class="tag__hash" aria-hidden="true">#</span>{{ tag }}
  </component>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition:
    color var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    background-color var(--duration-fast) ease;
}
.tag__hash { color: var(--color-accent); margin-right: 1px; }

a.tag:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}
.tag.is-active {
  color: var(--color-accent-contrast);
  background: var(--color-accent);
  border-color: var(--color-accent);
}
.tag.is-active .tag__hash { color: inherit; }
</style>
