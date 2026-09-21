<script setup>
import { profile } from '../../content/profile'
import { useI18n } from '../../i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer texture">
    <div class="container footer__inner">
      <p class="footer__copy">© {{ year }} {{ profile.name }}</p>
      <nav class="footer__links" :aria-label="t('nav.footer')">
        <a v-if="profile.links.linkedin" :href="profile.links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a v-if="profile.links.instagram" :href="profile.links.instagram" target="_blank" rel="noopener">Instagram</a>
        <a v-if="profile.links.github" :href="profile.links.github" target="_blank" rel="noopener">GitHub</a>
        <RouterLink to="/blog">{{ t('nav.blog') }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--space-16);
  padding-block: var(--space-8);
  border-top: 1px solid var(--color-border);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
  text-align: center;
}

.footer__copy { margin: 0; }

.footer__links {
  display: flex;
  gap: var(--space-6);
}
.footer__links a {
  color: var(--color-text-muted);
}
.footer__links a:hover { color: var(--color-text); }

@media (min-width: 640px) {
  .footer__inner {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
