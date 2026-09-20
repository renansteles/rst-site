<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts'
import PostCard from '../components/blog/PostCard.vue'
import TagFilter from '../components/blog/TagFilter.vue'

const route = useRoute()
const { tags, getByTag } = usePosts()

// A tag ativa vem da URL (/blog?tag=vue), então o filtro é compartilhável
const activeTag = computed(() => (typeof route.query.tag === 'string' ? route.query.tag : ''))
const filtered = computed(() => getByTag(activeTag.value))
</script>

<template>
  <div class="container blog">
    <header class="blog__header">
      <span class="eyebrow">Blog</span>
      <h1 class="blog__title">Notas de engenharia<span class="dot">.</span></h1>
      <p class="muted blog__intro">
        Textos sobre desenvolvimento, infraestrutura caseira e o que o tatame ensina sobre construir software.
      </p>
      <TagFilter v-if="tags.length" :tags="tags" :active="activeTag" />
    </header>

    <TransitionGroup v-if="filtered.length" name="list" tag="div" class="grid">
      <PostCard v-for="post in filtered" :key="post.slug" :post="post" />
    </TransitionGroup>

    <p v-else class="muted empty">Nenhum post com a tag <strong>#{{ activeTag }}</strong> ainda.</p>
  </div>
</template>

<style scoped>
.blog {
  padding-block: var(--space-12) var(--space-8);
}

.blog__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.blog__title { font-size: clamp(2rem, 5vw, 3rem); }
.dot { color: var(--color-accent); }

.blog__intro {
  max-width: 55ch;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
}
@media (min-width: 1100px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

.empty { padding-block: var(--space-8); }

/* Animação ao trocar o filtro */
.list-enter-active,
.list-leave-active {
  transition: all var(--duration-base) var(--ease-impact);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.list-leave-active { position: absolute; }
.list-move { transition: transform var(--duration-slow) var(--ease-impact); }
</style>
