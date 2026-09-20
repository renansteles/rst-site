/**
 * DADOS DA HOME
 * Tudo que aparece em "Sobre mim" vem daqui. Edite este arquivo para
 * atualizar nome, cargo, trajetória, skills e links — sem tocar nos componentes.
 */
/**
 * Início da carreira (ano-mês). Usado para calcular os anos de experiência
 * dinamicamente — o texto da bio nunca fica desatualizado.
 * Ajuste aqui se quiser contar a partir de outra data.
 */
const CAREER_START = '2013-01'

/** Anos completos desde uma data "AAAA-MM" até hoje */
export function yearsSince(yearMonth) {
  const [y, m] = yearMonth.split('-').map(Number)
  const now = new Date()
  let years = now.getFullYear() - y
  if (now.getMonth() + 1 < m) years -= 1 // ainda não completou o ano corrente
  return Math.max(0, years)
}

export const yearsOfExperience = yearsSince(CAREER_START)

export const profile = {
  name: 'Renan Teles',
  role: 'Analista de Sistemas · Sócio-Diretor na Rica Informática',
  tagline: 'Disciplina no código. Técnica no tatame.',
  bio: `Desenvolvedor de software e analista de sistemas, bacharel em Ciência da
Computação pela UECE e pós-graduando em Engenharia de Software com foco em
DevOps (Unifor), com mais de ${yearsOfExperience} anos construindo soluções
robustas e escaláveis — de sistemas de gestão em PHP/Laravel a apps mobile em
Flutter, APIs em Delphi e infraestrutura na AWS. Faixa preta de Jiu-Jitsu: levo
para o trabalho a mesma disciplina, fundamentos sólidos e respeito pelo processo.`,
  location: 'Fortaleza, Ceará — Brasil',

  // Links de contato. Remova os que não usar — os componentes se adaptam.
  links: {
    linkedin: 'https://www.linkedin.com/in/renansteles',
    instagram: 'https://www.instagram.com/renansteles',
    github: '', // TODO: adicionar se quiser exibir
  },
}

/**
 * TRAJETÓRIA
 * type: 'career' | 'bjj' | 'education' — define o marcador e o rótulo na timeline.
 * Ordene do mais recente para o mais antigo.
 */
export const timeline = [
  {
    year: '2026',
    type: 'education',
    title: 'Pós-graduação em Engenharia de Software',
    org: 'Universidade de Fortaleza (Unifor)',
    description: 'Especialização com foco em DevOps. Em andamento — início em setembro de 2026.',
  },
  {
    year: '2024',
    type: 'bjj',
    title: 'Faixa preta',
    org: '',
    description: 'Graduação em dezembro de 2024, quase dez anos depois do primeiro treino.',
  },
  {
    year: '2022',
    type: 'bjj',
    title: 'Faixa marrom',
    org: '',
    description: 'Dezembro de 2022.',
  },
  {
    year: '2021',
    type: 'career',
    title: 'Sócio & Diretor',
    org: 'Rica Informática',
    description:
      'Gestão estratégica e decisões voltadas a crescimento e inovação, sem sair do código: análise de sistemas, modelagem de dados e liderança de projetos, alinhando tecnologia às necessidades reais do negócio.',
  },
  {
    year: '2019',
    type: 'education',
    title: 'Bacharel em Ciência da Computação',
    org: 'Universidade Estadual do Ceará (UECE)',
    description: 'Graduação concluída (2013–2019).',
  },
  {
    year: '2018',
    type: 'bjj',
    title: 'Faixa roxa',
    org: '',
    description: 'Dezembro de 2018.',
  },
  {
    year: '2016',
    type: 'bjj',
    title: 'Faixa azul',
    org: '',
    description: 'Dezembro de 2016 — primeira graduação.',
  },
  {
    year: '2016',
    type: 'career',
    title: 'Analista de Sistemas',
    org: 'Rica Informática',
    description:
      'Desenvolvimento de sistemas para o comércio: apps Android em Java e Flutter, aplicações web em PHP e montagem de toda a infraestrutura em servidores Linux na AWS.',
  },
  {
    year: '2015',
    type: 'bjj',
    title: 'Primeiro treino de Jiu-Jitsu',
    org: '',
    description: 'O começo de tudo — faixa branca.',
  },
  {
    year: '2014',
    type: 'career',
    title: 'Estagiário em Desenvolvimento',
    org: 'Instituto Federal do Ceará (IFCE)',
    description:
      'Desenvolvimento e manutenção de sites, apoio à administração de bancos de dados e rotinas de manutenção de servidores (backups).',
  },
  {
    year: '2013',
    type: 'education',
    title: 'Início da graduação',
    org: 'Universidade Estadual do Ceará (UECE)',
    description: 'Ciência da Computação.',
  },
]

/**
 * HABILIDADES
 * Agrupadas por área. Adicione/remova livremente.
 */
export const skills = [
  {
    group: 'Backend',
    items: ['PHP', 'Laravel', 'Livewire', 'Delphi', 'Horse', 'APIs REST'],
  },
  {
    group: 'Frontend',
    items: ['Tailwind CSS', 'Alpine.js', 'Blade', 'Vue.js', 'JavaScript'],
  },
  {
    group: 'Mobile',
    items: ['Flutter', 'Dart', 'Android (Java)'],
  },
  {
    group: 'Banco de dados',
    items: ['FirebirdSQL', 'Modelagem de dados', 'Otimização de performance'],
  },
  {
    group: 'Infra & Cloud',
    items: ['AWS EC2', 'Linux', 'DevOps', 'Raspberry Pi', 'Git'],
  },
  {
    group: 'Gestão & Estratégia',
    items: ['OKR', 'Scrum', 'Gestão de processos e riscos', 'Análise SWOT', 'Diretrizes estratégicas'],
  },
]
