---
title: Deploy automático em casa: do git push ao ar em segundos
date: 2026-09-21
lang: pt-BR
summary: Como um Raspberry Pi na minha casa recebe um webhook do GitHub, builda e publica duas apps Vue sozinho — CI/CD sem intervenção manual, com HMAC, systemd e Cloudflare Tunnel.
tags: [devops, ci-cd, raspberry-pi, self-hosting, infra]
---

Este site e a minha aplicação de estudos rodam num Raspberry Pi 4 na minha casa. Quando eu edito um post, mexo num componente ou corrijo um bug, o fluxo é: `git push` — e pronto. Alguns segundos depois a nova versão está no ar. Sem SSH, sem copiar arquivo, sem lembrar de rodar comando nenhum.

Não foi sempre assim. No começo, cada atualização era um ritual: conectar no Pi, `git pull`, `npm run build`, copiar o `dist/` para a pasta do Nginx, conferir se não esqueci nada. Funcionava, mas era o tipo de trabalho manual que faz você adiar mudanças pequenas — e mudanças pequenas adiadas viram mudanças grandes e arriscadas. Automatizar isso foi uma das melhores decisões que tomei nesse projeto.

## CI/CD sem jargão

**CI** (integração contínua) é a ideia de que cada alteração de código é integrada ao projeto principal com frequência e passa por um processo automático — build, testes, o que fizer sentido — em vez de acumular semanas de mudanças para "integrar depois".

**CD** (entrega ou deploy contínuo) é o passo seguinte: se a alteração passou pelo processo, ela vai para produção automaticamente. Ninguém precisa apertar botão.

Na prática, é substituir "eu lembro de fazer" por "acontece sempre, do mesmo jeito". A máquina não esquece etapa, não pula o build e não copia a pasta errada.

## Por que webhook, e não polling

Existem duas formas de o servidor descobrir que há código novo.

**Polling**: um cron no Pi roda a cada X minutos, faz `git fetch` e compara. Simples, mas tem dois problemas: entre um push e o deploy há um atraso de até X minutos, e 99% das execuções não encontram nada — é trabalho desperdiçado, dia e noite.

**Webhook**: o GitHub avisa o servidor no instante em que o push acontece, com uma requisição HTTP. Zero atraso, zero trabalho inútil. O servidor fica quieto até ter algo a fazer.

A dificuldade do webhook é que o GitHub precisa *alcançar* o Pi — e um servidor caseiro, atrás de um roteador sem IP fixo, não é alcançável por padrão. É aí que entra a primeira peça.

## As peças

### Cloudflare Tunnel

Em vez de abrir portas no roteador e lidar com IP dinâmico, o Pi roda o `cloudflared`, que abre uma conexão de saída até a Cloudflare e mantém um túnel. Requisições para o meu domínio chegam na Cloudflare e são encaminhadas por esse túnel. Nenhuma porta aberta em casa, HTTPS automático e o IP residencial nunca aparece para ninguém.

O túnel encaminha cada hostname para um serviço local: os sites vão para o Nginx, e um subdomínio dedicado vai para o listener do webhook.

### O listener: `webhook`

O [webhook](https://github.com/adnanh/webhook) é um binário pequeno em Go que faz uma coisa só: escuta requisições HTTP e, quando uma bate com uma regra, executa um comando. A configuração é um JSON:

```json
[
  {
    "id": "deploy-site",
    "execute-command": "/home/pi/deploy/site.sh",
    "command-working-directory": "/home/pi/deploy",
    "trigger-rule": {
      "and": [
        {
          "match": {
            "type": "payload-hmac-sha256",
            "secret": "SEU_SECRET_AQUI",
            "parameter": { "source": "header", "name": "X-Hub-Signature-256" }
          }
        },
        {
          "match": {
            "type": "value",
            "value": "refs/heads/main",
            "parameter": { "source": "payload", "name": "ref" }
          }
        }
      ]
    }
  }
]
```

Duas regras, e as duas precisam ser verdadeiras: a assinatura HMAC confere **e** o push foi na branch `main`. Push em outra branch não dispara nada.

### O secret HMAC: quem pode acionar o deploy

Esse é o ponto que mais vale entender. Um endpoint público que executa um script é, por definição, um alvo. Qualquer pessoa que descobrisse a URL poderia mandar um POST e disparar deploys à vontade.

A solução é um segredo compartilhado. Ao cadastrar o webhook no GitHub, você informa o mesmo secret que está no `hooks.json`. A cada push, o GitHub calcula um **HMAC-SHA256** do corpo da requisição usando esse secret e envia o resultado no header `X-Hub-Signature-256`. O `webhook` recalcula a assinatura do lado de cá e compara.

Se alguém sem o secret mandar uma requisição, a assinatura não bate e o script nem chega a rodar. Se alguém interceptar e alterar o corpo, a assinatura também não bate. É autenticação e integridade num header só — e o secret nunca trafega pela rede.

### systemd: o listener sempre de pé

O `webhook` roda como serviço do systemd, então sobe junto com o Pi e reinicia sozinho se cair:

```ini
[Unit]
Description=GitHub webhook listener
After=network.target

[Service]
ExecStart=/usr/local/bin/webhook -hooks /home/pi/deploy/hooks.json -port 9000 -verbose
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```

`systemctl enable --now webhook` e nunca mais penso nisso.

### O script de deploy

É o que efetivamente publica. Versão simplificada:

```bash
#!/usr/bin/env bash
set -euo pipefail   # qualquer erro aborta o script — melhor não publicar do que publicar quebrado

REPO=/home/pi/apps/rst-site
DEST=/var/www/site

cd "$REPO"
git pull --ff-only origin main
npm ci                      # instala exatamente o que está no lockfile
npm run build               # gera dist/ otimizado

rsync -a --delete dist/ "$DEST"/   # troca o conteúdo servido pelo Nginx
echo "deploy ok: $(git rev-parse --short HEAD)"
```

O `rsync --delete` garante que arquivos de builds antigos (os assets com hash no nome) não se acumulem. Como o Nginx só serve arquivos estáticos, não há nada para reiniciar — o próximo request já pega a versão nova.

## O fluxo completo

```
 eu (git push)
      │
      ▼
 GitHub ──── POST + X-Hub-Signature-256 ────▶ Cloudflare
                                                  │ túnel
                                                  ▼
                                          Raspberry Pi
                                          ├─ webhook (systemd) valida HMAC + branch
                                          ├─ deploy.sh: pull → npm ci → build → rsync
                                          └─ Nginx serve o novo dist/
                                                  │
                                                  ▼
                                           rst.dev.br atualizado
```

Do push ao site atualizado leva mais ou menos o tempo do `npm run build` no Pi — na casa de dezenas de segundos.

## Por que vale a pena, mesmo num projeto pessoal

A tentação é achar que automação de deploy é coisa de time grande. É o contrário: quanto menor o projeto, mais o atrito manual pesa, porque não há ninguém cobrando e é fácil deixar para depois. Com o deploy automático, publicar uma correção de uma linha custa o mesmo que commitar — e isso muda o quanto você mexe no projeto.

Também é o melhor laboratório possível para entender o que os serviços "mágicos" fazem. Vercel, Netlify e GitHub Actions fazem essencialmente isto: recebem um evento do repositório, rodam um build num ambiente limpo e publicam o resultado. A diferença é escala, isolamento e conveniência — a lógica é a mesma. Quando você já montou um pipeline na mão, ler o YAML de uma Action ou depurar um build que falhou na nuvem deixa de ser caixa-preta.

E há a lição que o tatame já tinha me ensinado: consistência vence esforço heroico. Um processo pequeno que roda sempre do mesmo jeito é mais valioso do que um ritual cuidadoso que você faz "quando dá tempo".
