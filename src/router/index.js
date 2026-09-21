import { createRouter, createWebHistory } from 'vue-router'
import { useI18n } from '../i18n'

// Cada view é importada com `() => import(...)`: o Vite gera um chunk separado
// por rota e o navegador só baixa o código da página que está sendo visitada.
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { titleKey: 'titles.home' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { titleKey: 'titles.blog' },
  },
  {
    path: '/blog/:slug',
    name: 'post',
    component: () => import('../views/PostView.vue'),
    props: true, // o :slug chega como prop no componente
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { titleKey: 'titles.notFound' },
  },
]

const router = createRouter({
  // History mode: URLs limpas (/blog/meu-post). Exige que o servidor
  // devolva index.html para qualquer rota — veja o README (seção Deploy).
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition // voltar/avançar mantém a posição
    if (to.hash) return { el: to.hash, behavior: 'smooth' } // links de âncora (#contato)
    return { top: 0 }
  },
})

// Atualiza o <title> da aba a cada navegação (e ao trocar de idioma — ver App.vue).
// PostView sobrescreve com o título do post depois de carregá-lo.
export function updateTitle(route) {
  const { t } = useI18n()
  const site = t('site.name')
  document.title = route.meta.titleKey ? `${t(route.meta.titleKey)} · ${site}` : site
}

router.afterEach((to) => updateTitle(to))

export default router
