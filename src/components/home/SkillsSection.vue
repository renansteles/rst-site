<script setup>
import SectionTitle from '../ui/SectionTitle.vue'
import { skills } from '../../content/profile'
import { useI18n } from '../../i18n'

const { t, tr } = useI18n()
</script>

<template>
  <section id="skills" class="section skills">
    <div class="container">
      <SectionTitle :eyebrow="t('skills.eyebrow')" :title="t('skills.title')" />

      <div class="grid">
        <div
          v-for="(group, i) in skills"
          :key="tr(group.group)"
          v-reveal="{ delay: i * 80 }"
          class="card"
        >
          <h3 class="card__title">{{ tr(group.group) }}</h3>
          <ul class="chips">
            <li v-for="item in group.items" :key="tr(item)" class="chip">{{ tr(item) }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: var(--color-bg-elevated);
  border-block: 1px solid var(--color-border);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

.card {
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    transform var(--duration-base) var(--ease-impact),
    box-shadow var(--duration-base) var(--ease-impact),
    border-color var(--duration-base) ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
}

.card__title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.chips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  transition: border-color var(--duration-fast) ease, color var(--duration-fast) ease;
}
.chip:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
