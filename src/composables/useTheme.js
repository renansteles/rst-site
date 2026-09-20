import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'

// Estado compartilhado (module-level): todos os componentes que chamarem
// useTheme() enxergam o mesmo `theme`. O valor inicial vem do atributo
// data-theme que o script inline do index.html já aplicou.
const theme = ref(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

watch(theme, (value) => {
  document.documentElement.dataset.theme = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // localStorage pode estar indisponível (modo privado, etc.) — ignora
  }
})

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
