---
title: Três padrões que uso em todo composable Vue
date: 2025-03-19
summary: Estado compartilhado no nível do módulo, retorno de objetos e limpeza no unmount — convenções simples que evitam bugs sutis.
tags: [vue, javascript, frontend]
---

Composables são a melhor coisa da Composition API, mas é fácil escrevê-los de um jeito que funciona hoje e dá dor de cabeça em seis meses. Estes três padrões resolvem a maior parte dos problemas que já vi.

## 1. Estado compartilhado fica fora da função

Se você quer que dois componentes enxerguem o mesmo estado (tema, usuário logado, carrinho), declare o `ref` **fora** da função. Assim o módulo vira um singleton natural:

```js
import { ref } from 'vue'

// Uma única instância para toda a aplicação
const theme = ref('dark')

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
```

Se o `ref` estivesse dentro de `useTheme()`, cada componente teria sua própria cópia — e o header trocaria de tema sem o resto da página perceber.

## 2. Sempre retorne um objeto

Retornar um objeto (e não um array) permite que quem consome escolha só o que precisa e renomeie livremente:

```js
const { theme } = useTheme()
const { toggle: toggleTheme } = useTheme()
```

Arrays forçam ordem e são péssimos para composables com mais de dois valores.

## 3. Limpe o que você criou

Event listeners, observers, timers — tudo que é registrado no `onMounted` precisa ser removido no `onUnmounted`. Caso contrário, navegar entre rotas vai acumulando listeners fantasmas.

```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrolled(threshold = 8) {
  const scrolled = ref(false)
  const update = () => (scrolled.value = window.scrollY > threshold)

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))

  return { scrolled }
}
```

Um teste rápido: abra as DevTools, navegue entre rotas várias vezes e veja se o número de listeners cresce. Se crescer, tem vazamento.

## Resumo

| Padrão | Evita |
|---|---|
| Estado fora da função | Cópias desincronizadas |
| Retorno em objeto | Acoplamento por ordem |
| Limpeza no unmount | Vazamento de memória |

São regras pequenas, mas fazem diferença quando o projeto passa de dez composables.
