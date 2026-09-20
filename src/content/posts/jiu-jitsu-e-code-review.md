---
title: O que o Jiu-Jitsu me ensinou sobre code review
date: 2025-06-02
summary: Ego, posição antes de finalização e o valor de "tapar" cedo. Lições do tatame que uso toda semana revisando código.
tags: [carreira, jiu-jitsu, cultura]
---

Passei mais de uma década no tatame antes de receber a faixa preta. Nesse tempo, aprendi mais sobre trabalho em equipe do que em qualquer curso — e boa parte disso se aplica diretamente ao jeito como reviso e recebo revisões de código.

## Posição antes de finalização

No Jiu-Jitsu, você não tenta finalizar de qualquer lugar. Primeiro conquista a posição; a finalização vem como consequência.

Em code review é igual. Antes de apontar o *bug* na linha 47, vale entender:

1. O que esse PR está tentando resolver?
2. A abordagem geral faz sentido?
3. Só então: os detalhes estão corretos?

Comentar detalhes de estilo em uma abordagem que precisa ser refeita é desperdício de energia dos dois lados.

## Tapar cedo não é fraqueza

Quem treina sabe: bater (desistir de um golpe) cedo preserva a articulação e te deixa treinar no dia seguinte. Insistir por orgulho custa caro.

Quando alguém aponta um problema real no meu PR, a resposta mais eficiente é: "boa, vou ajustar". Não é derrota. É o processo funcionando.

```js
// Antes: defensivo
// "Isso funciona na minha máquina, o problema deve ser outro"

// Depois: curioso
// "Interessante, não tinha pensado nesse caso. Consegue mandar o input?"
```

## Rolar com todo mundo

Nas academias boas, faixa preta rola com faixa branca. Sem "carregar" no golpe, mas rolando de verdade — porque o iniciante aprende com o contato e o experiente aprende a controlar a intensidade.

Revisar código de gente mais júnior com a mesma seriedade (e paciência) que você usaria com um par é o equivalente. E pedir que juniores revisem o seu código também: eles fazem perguntas que a experiência já te fez parar de fazer.

## O que fica

- Entenda a posição antes de atacar o detalhe.
- Ceder rápido em um ponto válido é sinal de maturidade.
- Intensidade se controla; respeito não se negocia.

Nada disso é exclusivo de arte marcial. Mas o tatame tem um jeito de tornar essas lições difíceis de esquecer.
