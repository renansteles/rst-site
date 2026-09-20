<script setup>
import { computed, watchEffect } from 'vue'
import { usePosts, formatDate } from '../composables/usePosts'
import { useMarkdown } from '../composables/useMarkdown'
import TagBadge from '../components/blog/TagBadge.vue'
import NotFoundView from './NotFoundView.vue'
import '../assets/styles/markdown.css' // só carrega junto com esta rota

// O slug chega como prop porque a rota tem `props: true`
const props = defineProps({
  slug: { type: String, required: true },
})

const { getPost } = usePosts()
const { render } = useMarkdown()

const post = computed(() => getPost(props.slug))
const html = computed(() => (post.value ? render(post.value.content) : ''))

// Título da aba com o nome do post
watchEffect(() => {
  if (post.value) document.title = `${post.value.title} · Renan Teles`
})
</script>

<template>
  <NotFoundView v-if="!post" />

  <article v-else class="container post">
    <header class="post__header">
      <RouterLink :to="{ name: 'blog' }" class="post__back">
        <span aria-hidden="true">←</span> Todos os posts
      </RouterLink>

      <h1 class="post__title">{{ post.title }}</h1>

      <div class="post__meta">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ post.readingTime }} min de leitura</span>
      </div>

      <div v-if="post.tags.length" class="post__tags">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" :to="{ name: 'blog', query: { tag } }" />
      </div>
    </header>

    <!-- v-html é seguro aqui: o conteúdo vem de arquivos do próprio projeto -->
    <div class="prose" v-html="html"></div>

    <footer class="post__footer">
      <RouterLink :to="{ name: 'blog' }" class="post__back">
        <span aria-hidden="true">←</span> Voltar para o blog
      </RouterLink>
    </footer>
  </article>
</template>

<style scoped>
.post {
  max-width: calc(var(--content-max) + 2 * var(--space-8));
  padding-block: var(--space-12) var(--space-8);
}

.post__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.post__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
.post__back:hover { color: var(--color-text); }
.post__back span {
  transition: transform var(--duration-base) var(--ease-impact);
}
.post__back:hover span { transform: translateX(-3px); }

.post__title {
  font-size: clamp(1.9rem, 4.5vw, 2.75rem);
}

.post__meta {
  display: flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-faint);
}

.post__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.post__footer {
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}
</style>
