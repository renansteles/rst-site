<script setup>
import SectionTitle from '../ui/SectionTitle.vue'
import { timeline } from '../../content/profile'

// Rótulo exibido para cada tipo de item
const typeLabel = { career: 'Carreira', bjj: 'Jiu-Jitsu', education: 'Formação' }
</script>

<template>
  <section id="trajetoria" class="section">
    <div class="container">
      <SectionTitle eyebrow="Trajetória" title="Carreira e tatame, lado a lado" />

      <ol class="timeline">
        <li
          v-for="(item, i) in timeline"
          :key="`${item.year}-${item.title}`"
          v-reveal="{ delay: Math.min(i * 60, 300) }"
          class="item"
          :class="`item--${item.type}`"
        >
          <div class="item__marker" aria-hidden="true"></div>

          <div class="item__meta">
            <span class="item__year">{{ item.year }}</span>
            <span class="item__type">{{ typeLabel[item.type] }}</span>
          </div>

          <div class="item__body">
            <h3 class="item__title">{{ item.title }}</h3>
            <p v-if="item.org" class="item__org">{{ item.org }}</p>
            <p class="item__desc muted">{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  max-width: 48rem;
}

/* Linha vertical contínua */
.timeline::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 7px;
  width: 2px;
  background: var(--color-border);
}

.item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
  padding-left: var(--space-8);
  padding-bottom: var(--space-8);
}
.item:last-child { padding-bottom: 0; }

/* Marcador: círculo sobre a linha. Cor muda conforme o tipo. */
.item__marker {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--color-bg);
  background: var(--color-text-faint);
  box-shadow: 0 0 0 2px var(--color-border);
  transition: transform var(--duration-fast) var(--ease-impact);
}
.item--bjj .item__marker { background: var(--color-accent); }
.item--career .item__marker { background: var(--color-text); }
.item--education .item__marker { background: var(--color-text-muted); }
.item:hover .item__marker { transform: scale(1.25); }

.item__meta {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.item__year {
  color: var(--color-text);
  font-weight: 600;
}
.item__type {
  color: var(--color-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
}
.item--bjj .item__type { color: var(--color-accent); }

.item__title {
  font-size: 1.15rem;
  margin-bottom: var(--space-1);
}
.item__org {
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: var(--space-2);
}
.item__desc {
  margin: 0;
  font-size: 0.95rem;
  max-width: 60ch;
}

/* Em telas maiores, ano/tipo ficam em uma coluna à esquerda */
@media (min-width: 640px) {
  .timeline::before { left: calc(7rem + 7px); }
  .item {
    grid-template-columns: 7rem 1fr;
    gap: var(--space-8);
    padding-left: 0;
  }
  .item__marker { left: 7rem; }
  .item__meta {
    flex-direction: column;
    gap: var(--space-1);
    text-align: right;
    padding-right: var(--space-8);
  }
  .item__body { padding-left: var(--space-8); }
}
</style>
