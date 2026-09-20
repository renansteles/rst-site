<script setup>
import { computed } from 'vue'
import SectionTitle from '../ui/SectionTitle.vue'
import { profile } from '../../content/profile'

// Monta a lista de contatos a partir de profile.links, ignorando os vazios
const contacts = computed(() =>
  [
    { key: 'linkedin', label: 'LinkedIn', value: profile.links.linkedin?.replace(/^https?:\/\//, ''), href: profile.links.linkedin },
    { key: 'instagram', label: 'Instagram', value: profile.links.instagram?.replace(/^https?:\/\//, ''), href: profile.links.instagram },
    { key: 'github', label: 'GitHub', value: profile.links.github?.replace(/^https?:\/\//, ''), href: profile.links.github },
    { key: 'email', label: 'E-mail', value: profile.links.email, href: `mailto:${profile.links.email}` },
  ].filter((c) => c.value),
)
</script>

<template>
  <section id="contato" class="section">
    <div class="container">
      <SectionTitle eyebrow="Contato" title="Vamos conversar">
        <p class="muted intro">
          Aberto a projetos, colaborações e boas conversas sobre engenharia ou treino.
        </p>
      </SectionTitle>

      <ul class="contacts">
        <li v-for="(c, i) in contacts" :key="c.key" v-reveal="{ delay: i * 60 }">
          <a
            :href="c.href"
            class="contact"
            :target="c.key === 'email' ? null : '_blank'"
            :rel="c.key === 'email' ? null : 'noopener'"
          >
            <span class="contact__label">{{ c.label }}</span>
            <span class="contact__value">{{ c.value }}</span>
            <span class="contact__arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.intro {
  max-width: 50ch;
  margin: 0;
}

.contacts {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 40rem;
  border-top: 1px solid var(--color-border);
}

.contact {
  display: grid;
  grid-template-columns: 6rem 1fr auto;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-2);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  transition: background-color var(--duration-fast) ease, padding-left var(--duration-base) var(--ease-impact);
}
.contact:hover {
  background: var(--color-surface);
  padding-left: var(--space-4);
  color: var(--color-text);
}

.contact__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contact__value {
  font-weight: 500;
  overflow-wrap: anywhere;
}

.contact__arrow {
  color: var(--color-accent);
  transition: transform var(--duration-base) var(--ease-impact);
}
.contact:hover .contact__arrow { transform: translateX(4px); }
</style>
