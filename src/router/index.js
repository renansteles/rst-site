import { createRouter, createWebHistory } from 'vue-router'

const SITE_NAME = 'Renan Teles'

// Cada view é importada com `() => import(...)`: o Vite gera um chunk separado
// por rota e o navegador só baixa o código da página que está sendo visitada.
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Sobre mim' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { title: 'Blog' },
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
    meta: { title: 'Página não encontrada' },
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

// Atualiza o <title> da aba a cada navegação.
// PostView sobrescreve com o título do post depois de carregá-lo.
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${SITE_NAME}` : SITE_NAME
})

export default router
