<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
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
