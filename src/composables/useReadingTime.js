const WORDS_PER_MINUTE = 200

/**
 * Estima o tempo de leitura de um texto Markdown.
 * Remove blocos de código da contagem (eles inflam o número de "palavras"),
 * mas soma um pequeno bônus por bloco, já que código se lê mais devagar.
 */
export function useReadingTime(markdown) {
  const codeBlocks = markdown.match(/```[\s\S]*?```/g) ?? []
  const prose = markdown.replace(/```[\s\S]*?```/g, '')
  const words = prose.split(/\s+/).filter(Boolean).length
  const minutes = words / WORDS_PER_MINUTE + codeBlocks.length * 0.5
  return Math.max(1, Math.round(minutes))
}
