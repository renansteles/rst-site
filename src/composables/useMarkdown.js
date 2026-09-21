import { Marked } from 'marked'
import hljs from 'highlight.js/lib/core'

// Registra apenas as linguagens usadas nos posts. Cada uma pesa alguns KB;
// para adicionar outra, importe de 'highlight.js/lib/languages/<nome>'.
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml' // HTML e templates Vue
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import nginx from 'highlight.js/lib/languages/nginx'
import python from 'highlight.js/lib/languages/python'
import ini from 'highlight.js/lib/languages/ini' // units do systemd, .toml, .ini

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('python', python)
hljs.registerLanguage('ini', ini)
hljs.registerLanguage('toml', ini)

/** "Configurando o Nginx" → "configurando-o-nginx" (para ids de âncora) */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Rótulo acessível do link "#" nos títulos; definido a cada render() conforme o idioma
let anchorLabel = 'Link para esta seção'

// Instância própria do Marked para não vazar configuração global
const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    // Blocos de código com syntax highlight e rótulo da linguagem
    code({ text, lang }) {
      const language = (lang ?? '').trim().split(/\s+/)[0]
      const highlighted =
        language && hljs.getLanguage(language)
          ? hljs.highlight(text, { language }).value
          : escapeHtml(text)
      const attr = language ? ` data-lang="${language}"` : ''
      return `<div class="code-block"${attr}><pre><code class="hljs language-${language || 'text'}">${highlighted}</code></pre></div>\n`
    },

    // Títulos com id para permitir links de âncora (#secao)
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens)
      const id = slugify(tokens.map((t) => t.raw ?? '').join(''))
      return `<h${depth} id="${id}">${text}<a class="heading-anchor" href="#${id}" aria-label="${anchorLabel}">#</a></h${depth}>\n`
    },

    // Imagens com lazy loading (o navegador só baixa ao rolar até elas)
    image({ href, title, text }) {
      const t = title ? ` title="${escapeHtml(title)}"` : ''
      return `<img src="${href}" alt="${escapeHtml(text)}"${t} loading="lazy" decoding="async">`
    },

    // Links externos abrem em nova aba
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const external = /^https?:\/\//.test(href)
      const t = title ? ` title="${escapeHtml(title)}"` : ''
      const target = external ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${t}${target}>${text}</a>`
    },
  },
})

/**
 * Converte Markdown em HTML pronto para v-html.
 * Como os posts são arquivos locais do projeto (conteúdo confiável),
 * não há sanitização — se um dia os posts vierem de usuários, adicione DOMPurify.
 */
export function useMarkdown() {
  const render = (markdown, options = {}) => {
    if (options.anchorLabel) anchorLabel = options.anchorLabel
    return marked.parse(markdown)
  }
  return { render }
}
