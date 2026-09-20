---
title: Dois sites Vue no mesmo Raspberry Pi, sem conflito
date: 2025-08-14
summary: Como servir uma aplicação na raiz do domínio e outra em um subdomínio, no mesmo Pi, com Nginx e builds independentes.
tags: [infra, raspberry-pi, nginx, vue]
---

Tenho duas aplicações Vue rodando em um único Raspberry Pi: este site, na raiz do domínio, e outra em um subdomínio. Cada uma tem seu próprio repositório, build e deploy — e nenhuma sabe que a outra existe. É isso que faz a coisa funcionar sem dor.

## A ideia

O Nginx recebe todas as requisições na porta 80/443 e decide, pelo `server_name`, qual pasta servir. Cada app Vue vira uma pasta estática depois do `vite build`. Simples assim:

```
/var/www/
├── site/        ← meusite.com       (este site)
└── app/         ← app.meusite.com   (a outra aplicação)
```

## Configuração do Nginx

Um `server` block para cada domínio. O detalhe importante é o `try_files`: como o Vue Router usa **history mode**, uma URL como `/blog/meu-post` precisa cair no `index.html` para o roteador do lado do cliente assumir.

```nginx
server {
    listen 80;
    server_name meusite.com www.meusite.com;
    root /var/www/site;
    index index.html;

    # Qualquer rota que não seja arquivo vai para o index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Assets com hash no nome podem ser cacheados agressivamente
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

server {
    listen 80;
    server_name app.meusite.com;
    root /var/www/app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

![Diagrama do setup](/images/raspberry-setup.svg)

## Build e deploy independentes

No projeto do site raiz, o `vite.config.js` fica com o `base` padrão (`/`), porque ele vive na raiz. No projeto do subdomínio, a mesma coisa — subdomínio também é raiz do ponto de vista da aplicação.

O deploy é um `rsync` por projeto:

```bash
# No seu computador, dentro do projeto
npm run build
rsync -avz --delete dist/ pi@192.168.1.10:/var/www/site/
```

> A flag `--delete` remove do servidor os arquivos que não existem mais no `dist/`. Sem ela, builds antigos vão se acumulando.

## Checklist

- [x] Um `server` block por domínio
- [x] `try_files` apontando para `index.html`
- [x] `base` padrão no Vite para apps na raiz
- [x] Deploy separado, um `rsync` por projeto

O que mais ajuda aqui é resistir à tentação de "unificar" as duas apps. Elas são independentes — e é mais fácil manter assim.
