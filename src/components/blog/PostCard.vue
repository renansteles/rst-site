<script setup>
import TagBadge from './TagBadge.vue'
import { formatDate } from '../../composables/usePosts'
import { useI18n } from '../../i18n'

defineProps({
  post: { type: Object, required: true },
})

const { t, locale } = useI18n()
</script>

<template>
  <article class="card">
    <!-- O link cobre o card inteiro via ::after (ver CSS), mas as tags
         ficam clicáveis separadamente por terem z-index maior -->
    <RouterLink :to="{ name: 'post', params: { slug: post.slug } }" class="card__link">
      <h3 class="card__title">{{ post.title }}</h3>
    </RouterLink>

    <p class="card__summary muted">{{ post.summary }}</p>

    <footer class="card__footer">
      <div class="card__meta">
        <time :datetime="post.date">{{ formatDate(post.date, locale) }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ t('blog.readingTime', { n: post.readingTime }) }}</span>
        <!-- Indica o idioma quando o post não está no idioma da interface -->
        <span v-if="post.lang !== locale" class="card__lang">{{ t(`blog.langBadge.${post.lang}`) }}</span>
      </div>
      <div v-if="post.tags.length" class="card__tags">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" :to="{ name: 'blog', query: { tag } }" />
      </div>
    </footer>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
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

.card__link {
  color: var(--color-text);
}
/* Expande a área clicável para o card inteiro */
.card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.card__title {
  font-size: 1.25rem;
  transition: color var(--duration-fast) ease;
}
.card:hover .card__title { color: var(--color-accent); }

.card__summary {
  margin: 0;
  font-size: 0.95rem;
  flex: 1;
}

.card__footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.card__meta {
  display: flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faint);
}

.card__lang {
  margin-left: auto;
  padding: 0 0.4em;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  letter-spacing: 0.08em;
}

.card__tags {
  position: relative;
  z-index: 2; /* acima do link expandido, para as tags serem clicáveis */
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
