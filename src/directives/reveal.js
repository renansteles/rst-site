/**
 * Diretiva v-reveal
 * Adiciona a classe `.reveal` ao elemento e, quando ele entra no viewport,
 * troca para `.reveal.is-visible` (a animação está em base.css).
 *
 * Uso: <li v-reveal> … </li>
 *      <li v-reveal="{ delay: 120 }"> … </li>   (atraso em ms, útil em listas)
 */
export default {
  mounted(el, binding) {
    const delay = binding.value?.delay ?? 0
    el.classList.add('reveal')
    if (delay) el.style.transitionDelay = `${delay}ms`

    // Navegadores sem IntersectionObserver (raros): mostra direto
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el) // anima só uma vez
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
