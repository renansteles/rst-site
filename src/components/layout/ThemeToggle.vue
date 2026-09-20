<script setup>
import { useTheme } from '../../composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    class="toggle"
    type="button"
    :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
    :title="theme === 'dark' ? 'Modo claro' : 'Modo escuro'"
    @click="toggle"
  >
    <!-- Sol -->
    <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <!-- Lua -->
    <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  </button>
</template>

<style scoped>
.toggle {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  margin-left: var(--space-2);
  border-radius: var(--radius-md);
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
