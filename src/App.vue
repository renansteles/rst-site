<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { updateTitle } from './router'
import { useI18n } from './i18n'

// Ao trocar o idioma, o título da aba acompanha (em páginas de post, o
// PostView cuida do próprio título)
const route = useRoute()
const { locale } = useI18n()
watch(locale, () => {
  if (route.name !== 'post') updateTitle(route)
})
</script>

<template>
  <AppHeader />

  <!-- A transição "page" (definida em base.css) faz um fade + leve deslocamento
       entre rotas. mode="out-in": a página atual sai antes da próxima entrar. -->
  <main class="main">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <AppFooter />
</template>

<style scoped>
.main {
  flex: 1; /* empurra o footer para o fim da tela em páginas curtas */
}
</style>
