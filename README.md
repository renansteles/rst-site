# rst-site

Site pessoal — "Sobre mim" + blog técnico. Vue 3 + Vite, sem backend.

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor local em http://localhost:5173
npm run build      # gera a pasta dist/ pronta para deploy
npm run preview    # serve o dist/ localmente para conferir o build
```

## Onde editar o quê

| Quero mudar… | Arquivo |
|---|---|
| Nome, cargo, frase, bio, links | `src/content/profile.js` (`profile`) |
| Trajetória (timeline) | `src/content/profile.js` (`timeline`) |
| Skills | `src/content/profile.js` (`skills`) |
| Cores, fontes, raios, sombras (compartilhados com estudos.rst.dev.br) | `../rst-design-tokens/design-tokens.css` (pacote `@rst/design-tokens`) |
| Espaçamentos, larguras e aliases deste site | `src/assets/styles/tokens.css` |
| Estilo do conteúdo dos posts | `src/assets/styles/markdown.css` |
| Linguagens com syntax highlight | `src/composables/useMarkdown.js` |
| Rotas | `src/router/index.js` |

## Escrevendo um post

Crie um arquivo em `src/content/posts/nome-do-post.md`. O nome do arquivo vira a URL (`/blog/nome-do-post`).

```markdown
---
title: Título do post
date: 2025-09-20
summary: Resumo curto que aparece no card.
tags: [vue, infra]
published: true
---

Conteúdo em Markdown. Suporta títulos, listas, tabelas, blocos de código
com highlight (```js, ```bash, ```nginx…), imagens, citações.
```

- `published: false` esconde o post sem apagar o arquivo.
- Imagens: coloque em `public/images/` e referencie como `/images/arquivo.png`.
- O tempo de leitura é calculado automaticamente.

## Design system compartilhado

A identidade visual (paleta, Inter, raios, sombras, timings) vem do pacote local
`@rst/design-tokens` (`../rst-design-tokens`), instalado via `file:` e importado em
`src/main.js`. O mesmo pacote é usado pelo projeto `estudos`, então uma mudança lá
reflete nos dois sites. Ao clonar este repositório em outra máquina, clone também
`rst-design-tokens` ao lado antes do `npm install`.

## Estrutura

```
src/
├── main.js              bootstrap (app, router, fontes, CSS global)
├── App.vue              shell: header + <RouterView> + footer
├── router/              rotas com lazy loading
├── views/               uma view por rota (Home, Blog, Post, 404)
├── components/
│   ├── layout/          AppHeader, AppFooter, ThemeToggle
│   ├── home/            Hero, Timeline, Skills, Contact
│   ├── blog/            PostCard, TagFilter, TagBadge
│   └── ui/              BaseButton, SectionTitle
├── composables/         useTheme, usePosts, useMarkdown, useReadingTime
├── directives/          v-reveal (animação ao rolar)
├── content/             profile.js + posts/*.md
└── assets/
    ├── styles/          tokens.css, base.css, markdown.css
    └── textures/        tatame.svg
```

## Deploy no Raspberry Pi (Nginx)

O build gera arquivos estáticos. Este site roda na **raiz do domínio**, e a outra
aplicação Vue continua no subdomínio dela — cada uma com seu próprio `server` block.

1. Build e envio:

```bash
npm run build
rsync -avz --delete dist/ pi@SEU_PI:/var/www/site/
```

2. Nginx (`/etc/nginx/sites-available/site`):

```nginx
server {
    listen 80;
    server_name meusite.com www.meusite.com;
    root /var/www/site;
    index index.html;

    # Obrigatório para o Vue Router em history mode:
    # rotas como /blog/meu-post precisam cair no index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Assets têm hash no nome, podem ser cacheados por muito tempo
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/site /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Para HTTPS, `certbot --nginx -d meusite.com -d www.meusite.com`.

### Caddy (alternativa)

```
meusite.com {
    root * /var/www/site
    file_server
    try_files {path} /index.html
}
```
