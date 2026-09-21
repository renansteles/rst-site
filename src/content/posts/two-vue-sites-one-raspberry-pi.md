---
title: Two Vue sites on one Raspberry Pi, no conflicts
date: 2025-08-14
lang: en
summary: How to serve one app at the root domain and another on a subdomain from the same Pi, with Nginx and independent builds.
tags: [infra, raspberry-pi, nginx, vue]
---

I run two Vue applications on a single Raspberry Pi: this site, at the root domain, and another one on a subdomain. Each has its own repository, build and deploy — and neither knows the other exists. That is what makes it work painlessly.

## The idea

Nginx receives every request on ports 80/443 and decides, by `server_name`, which folder to serve. Each Vue app becomes a static folder after `vite build`. That simple:

```
/var/www/
├── site/        ← rst.dev.br          (this site)
└── app/         ← estudos.rst.dev.br  (the other app)
```

## Nginx configuration

One `server` block per domain. The important detail is `try_files`: since Vue Router uses **history mode**, a URL like `/blog/my-post` must fall through to `index.html` so the client-side router can take over.

```nginx
server {
    listen 80;
    server_name rst.dev.br www.rst.dev.br;
    root /var/www/site;
    index index.html;

    # Any route that is not a file goes to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Hashed assets can be cached aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

server {
    listen 80;
    server_name estudos.rst.dev.br;
    root /var/www/app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Independent build and deploy

In the root site project, `vite.config.js` keeps the default `base` (`/`), because it lives at the root. Same thing in the subdomain project — from the app's point of view a subdomain is also a root.

Deploy is one `rsync` per project:

```bash
# On your machine, inside the project
npm run build
rsync -avz --delete dist/ pi@192.168.1.10:/var/www/site/
```

> The `--delete` flag removes files from the server that no longer exist in `dist/`. Without it, old builds pile up.

## Checklist

- [x] One `server` block per domain
- [x] `try_files` pointing to `index.html`
- [x] Default `base` in Vite for apps at the root
- [x] Separate deploys, one `rsync` per project

What helps most here is resisting the urge to "unify" the two apps. They are independent — and easier to maintain that way.
