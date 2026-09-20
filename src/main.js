import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'

// Fontes self-hosted: são empacotadas no build, sem requisições a serviços externos.
// Só os pesos usados são importados para manter o bundle enxuto.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/jetbrains-mono/400.css'

// Estilos globais. Ordem importa:
// 1. tokens compartilhados (pacote @rst/design-tokens — mesmo arquivo usado no "estudos")
// 2. aliases/tokens específicos deste site
// 3. base (reset, tipografia, utilitários)
import '@rst/design-tokens/design-tokens.css'
import './assets/styles/tokens.css'
import './assets/styles/base.css'

createApp(App)
  .use(router)
  .directive('reveal', reveal) // uso: <div v-reveal>…</div>
  .mount('#app')
