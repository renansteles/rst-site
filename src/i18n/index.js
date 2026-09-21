import { ref, watch } from 'vue'
import ptBR from './pt-BR'
import en from './en'

/**
 * i18n minimalista.
 * - `locale`: idioma ativo ('pt-BR' | 'en'), persistido em localStorage.
 *   Na primeira visita, segue o idioma do navegador.
 * - `t('chave.aninhada', { n: 5 })`: texto da interface (dicionários em src/i18n/*.js).
 * - `tr(campo)`: resolve campos bilíngues do profile.js, no formato { 'pt-BR': '…', en: '…' }.
 *   Strings simples passam direto — então só traduza o que precisar.
 */
const messages = { 'pt-BR': ptBR, en }
const DEFAULT_LOCALE = 'pt-BR'
const STORAGE_KEY = 'locale'

function detectLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved in messages) return saved
  } catch {
    /* localStorage indisponível */
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LOCALE
}

// Estado compartilhado por toda a aplicação
const locale = ref(detectLocale())

watch(
  locale,
  (value) => {
    document.documentElement.lang = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignora */
    }
  },
  { immediate: true },
)

function lookup(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? undefined : obj[part]), dict)
}

export function useI18n() {
  const t = (key, params = {}) => {
    // Lê `locale.value` dentro da função: templates que usam t() re-renderizam ao trocar idioma
    let text = lookup(messages[locale.value], key) ?? lookup(messages[DEFAULT_LOCALE], key) ?? key
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value))
    }
    return text
  }

  const tr = (value) => {
    if (value && typeof value === 'object') {
      return value[locale.value] ?? value[DEFAULT_LOCALE] ?? Object.values(value)[0] ?? ''
    }
    return value ?? ''
  }

  const setLocale = (value) => {
    if (value in messages) locale.value = value
  }

  const toggle = () => setLocale(locale.value === 'en' ? 'pt-BR' : 'en')

  return { locale, t, tr, setLocale, toggle, locales: Object.keys(messages) }
}

/** Atalho para arquivos de dados: L('texto em pt', 'text in en') */
export const L = (pt, en) => ({ 'pt-BR': pt, en })
