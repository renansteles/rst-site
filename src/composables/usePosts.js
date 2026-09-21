import { computed } from 'vue'
import { useReadingTime } from './useReadingTime'

/**
 * Carrega todos os posts de src/content/posts/*.md em tempo de build.
 *
 * `import.meta.glob` com `eager: true` inclui o conteúdo bruto dos arquivos
 * no bundle. Para um blog pessoal com dezenas de posts isso é ótimo: a lista
 * e os posts abrem instantaneamente, sem requisições extras. Se um dia o
 * volume crescer muito, basta trocar para `eager: false` e carregar sob demanda.
 */
const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/**
 * Parser de frontmatter minimalista (chave: valor, uma por linha).
 * Suporta strings, listas inline `[a, b, c]` e booleanos.
 * Evita depender de `gray-matter`, que precisa de polyfills do Node no browser.
 */
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (value === 'true' || value === 'false') {
      value = value === 'true'
    } else {
      value = value.replace(/^["']|["']$/g, '')
    }
    data[key] = value
  }
  return { data, content: match[2] }
}

/** Extrai o slug do caminho: "../content/posts/meu-post.md" → "meu-post" */
function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

// Processa os arquivos uma única vez ao carregar o módulo
const allPosts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      summary: data.summary ?? '',
      date: data.date ?? '1970-01-01',
      tags: Array.isArray(data.tags) ? data.tags : [],
      lang: data.lang ?? 'pt-BR', // idioma do post (frontmatter `lang: en` para inglês)
      published: data.published !== false, // publicado por padrão
      readingTime: useReadingTime(content),
      content, // markdown cru; é convertido em HTML só no PostView
    }
  })
  .filter((post) => post.published)
  .sort((a, b) => (a.date < b.date ? 1 : -1)) // mais recente primeiro

export function usePosts() {
  const posts = computed(() => allPosts)

  /** Todas as tags únicas, ordenadas alfabeticamente */
  const tags = computed(() => {
    const set = new Set()
    allPosts.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return [...set].sort((a, b) => a.localeCompare(b))
  })

  const getPost = (slug) => allPosts.find((p) => p.slug === slug) ?? null

  const getByTag = (tag) => (tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts)

  /**
   * Posts no idioma pedido. Se não houver nenhum nesse idioma, devolve todos
   * (com `fallback: true`) — melhor mostrar posts em PT do que uma lista vazia.
   */
  const getByLang = (lang) => {
    const list = allPosts.filter((p) => p.lang === lang)
    return list.length ? { posts: list, fallback: false } : { posts: allPosts, fallback: true }
  }

  return { posts, tags, getPost, getByTag, getByLang }
}

/** Formata "2024-03-15" → "15 de mar. de 2024" (pt-BR) ou "Mar 15, 2024" (en) */
export function formatDate(iso, locale = 'pt-BR') {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
