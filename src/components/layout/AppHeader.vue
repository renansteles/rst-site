<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import { profile } from '../../content/profile'

// Aplica uma borda/sombra no header só depois que a página rola um pouco
const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="Início">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__name">{{ profile.name }}</span>
      </RouterLink>

      <nav class="nav" aria-label="Principal">
        <RouterLink to="/" class="nav__link">Sobre</RouterLink>
        <RouterLink to="/blog" class="nav__link">Blog</RouterLink>
        <!-- Link externo para a app de estudos (subdomínio, deploy independente) -->
        <a href="https://estudos.rst.dev.br" class="nav__link nav__link--external" target="_blank" rel="noopener">
          Estudos<span class="nav__ext" aria-hidden="true">↗</span>
        </a>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--color-bg) 82%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--duration-base) ease;
}
.header.is-scrolled {
  border-bottom-color: var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

/* --- Marca --- */
.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text);
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.brand:hover { color: var(--color-text); }

/* Pequeno traço vermelho: referência discreta à ponta da faixa */
.brand__mark {
  width: 22px;
  height: 4px;
  border-radius: 2px;
  background: var(--color-accent);
  transition: width var(--duration-base) var(--ease-impact);
}
.brand:hover .brand__mark { width: 30px; }

/* --- Navegação --- */
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav__link {
  position: relative;
  padding: var(--space-2) var(--space-3);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  transition: color var(--duration-fast) ease;
}
.nav__link:hover,
.nav__link.router-link-active {
  color: var(--color-text);
}

/* Sublinhado que cresce a partir do centro */
.nav__link::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: 2px;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--duration-base) var(--ease-impact);
}
.nav__link:hover::after,
.nav__link.router-link-exact-active::after {
  transform: scaleX(1);
}

/* Setinha discreta indicando link externo */
.nav__ext {
  display: inline-block;
  margin-left: 0.2em;
  font-size: 0.75em;
  color: var(--color-text-faint);
  transition:
    transform var(--duration-base) var(--ease-impact),
    color var(--duration-fast) ease;
}
.nav__link--external:hover .nav__ext {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}
</style>
