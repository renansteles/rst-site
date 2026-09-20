<script setup>
/** Título de seção padronizado: rótulo pequeno em cima + h2 */
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
})
</script>

<template>
  <div class="section-title">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-12);
}
</style>
