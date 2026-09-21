<script setup>
import TagBadge from './TagBadge.vue'
import { useI18n } from '../../i18n'

const { t } = useI18n()

defineProps({
  tags: { type: Array, required: true },
  active: { type: String, default: '' },
})
</script>

<template>
  <nav class="filter" :aria-label="t('blog.filterLabel')">
    <TagBadge :tag="t('blog.allTags')" :to="{ name: 'blog' }" :active="!active" />
    <TagBadge
      v-for="tag in tags"
      :key="tag"
      :tag="tag"
      :to="{ name: 'blog', query: { tag } }"
      :active="active === tag"
    />
  </nav>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
