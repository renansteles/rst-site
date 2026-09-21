/**
 * DADOS DA HOME
 * Tudo que aparece em "Sobre mim" vem daqui. Edite este arquivo para
 * atualizar nome, cargo, trajetória, skills e links — sem tocar nos componentes.
 *
 * Textos bilíngues usam L('português', 'english'). Strings simples (nomes,
 * siglas, tecnologias) não precisam de tradução e ficam como estão.
 */
import { L } from '../i18n'

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
  role: L(
    'Analista de Sistemas · Sócio-Diretor na Rica Informática',
    'Systems Analyst · Partner & Director at Rica Informática',
  ),
  tagline: L('Disciplina no código. Técnica no tatame.', 'Discipline in code. Technique on the mats.'),
  bio: L(
    `Desenvolvedor de software e analista de sistemas, bacharel em Ciência da
Computação pela UECE e pós-graduando em Engenharia de Software com foco em
DevOps (Unifor), com mais de ${yearsOfExperience} anos construindo soluções
robustas e escaláveis — de sistemas de gestão em PHP/Laravel a apps mobile em
Flutter, APIs em Delphi e infraestrutura na AWS. Faixa preta de Jiu-Jitsu: levo
para o trabalho a mesma disciplina, fundamentos sólidos e respeito pelo processo.`,
    `Software developer and systems analyst with a B.Sc. in Computer Science
(UECE) and a postgraduate student in Software Engineering with a DevOps focus
(Unifor), with over ${yearsOfExperience} years building robust, scalable
solutions — from PHP/Laravel management systems to Flutter mobile apps, Delphi
APIs and AWS infrastructure. Jiu-Jitsu black belt: I bring the same discipline,
solid fundamentals and respect for the process to my work.`,
  ),
  location: L('Fortaleza, Ceará — Brasil', 'Fortaleza, Ceará — Brazil'),

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
    title: L('Pós-graduação em Engenharia de Software', 'Postgraduate in Software Engineering'),
    org: L('Universidade de Fortaleza (Unifor)', 'University of Fortaleza (Unifor)'),
    description: L(
      'Especialização com foco em DevOps. Em andamento — início em setembro de 2026.',
      'Specialization focused on DevOps. In progress — started September 2026.',
    ),
  },
  {
    year: '2024',
    type: 'bjj',
    title: L('Faixa preta', 'Black belt'),
    org: '',
    description: L(
      'Graduação em dezembro de 2024, quase dez anos depois do primeiro treino.',
      'Promoted in December 2024, almost ten years after the first class.',
    ),
  },
  {
    year: '2022',
    type: 'bjj',
    title: L('Faixa marrom', 'Brown belt'),
    org: '',
    description: L('Dezembro de 2022.', 'December 2022.'),
  },
  {
    year: '2021',
    type: 'career',
    title: L('Sócio & Diretor', 'Partner & Director'),
    org: 'Rica Informática',
    description: L(
      'Gestão estratégica e decisões voltadas a crescimento e inovação, sem sair do código: análise de sistemas, modelagem de dados e liderança de projetos, alinhando tecnologia às necessidades reais do negócio.',
      'Strategic management and decisions focused on growth and innovation, without leaving the code: systems analysis, data modeling and project leadership, aligning technology with real business needs.',
    ),
  },
  {
    year: '2019',
    type: 'education',
    title: L('Bacharel em Ciência da Computação', 'B.Sc. in Computer Science'),
    org: L('Universidade Estadual do Ceará (UECE)', 'State University of Ceará (UECE)'),
    description: L('Graduação concluída (2013–2019).', 'Degree completed (2013–2019).'),
  },
  {
    year: '2018',
    type: 'bjj',
    title: L('Faixa roxa', 'Purple belt'),
    org: '',
    description: L('Dezembro de 2018.', 'December 2018.'),
  },
  {
    year: '2016',
    type: 'bjj',
    title: L('Faixa azul', 'Blue belt'),
    org: '',
    description: L('Dezembro de 2016 — primeira graduação.', 'December 2016 — first promotion.'),
  },
  {
    year: '2016',
    type: 'career',
    title: L('Analista de Sistemas', 'Systems Analyst'),
    org: 'Rica Informática',
    description: L(
      'Desenvolvimento de sistemas para o comércio: apps Android em Java e Flutter, aplicações web em PHP e montagem de toda a infraestrutura em servidores Linux na AWS.',
      'Building systems for retail: Android apps in Java and Flutter, web applications in PHP and the full infrastructure on Linux servers at AWS.',
    ),
  },
  {
    year: '2015',
    type: 'bjj',
    title: L('Primeiro treino de Jiu-Jitsu', 'First Jiu-Jitsu class'),
    org: '',
    description: L('O começo de tudo — faixa branca.', 'Where it all began — white belt.'),
  },
  {
    year: '2014',
    type: 'career',
    title: L('Estagiário em Desenvolvimento', 'Software Development Intern'),
    org: L('Instituto Federal do Ceará (IFCE)', 'Federal Institute of Ceará (IFCE)'),
    description: L(
      'Desenvolvimento e manutenção de sites, apoio à administração de bancos de dados e rotinas de manutenção de servidores (backups).',
      'Website development and maintenance, database administration support and server maintenance routines (backups).',
    ),
  },
  {
    year: '2013',
    type: 'education',
    title: L('Início da graduação', 'Started the degree'),
    org: L('Universidade Estadual do Ceará (UECE)', 'State University of Ceará (UECE)'),
    description: L('Ciência da Computação.', 'Computer Science.'),
  },
]

/**
 * HABILIDADES
 * Agrupadas por área. Adicione/remova livremente.
 */
export const skills = [
  {
    group: 'Backend',
    items: ['PHP', 'Laravel', 'Livewire', 'Delphi', 'Horse', L('APIs REST', 'REST APIs')],
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
    group: L('Banco de dados', 'Databases'),
    items: ['FirebirdSQL', L('Modelagem de dados', 'Data modeling'), L('Otimização de performance', 'Performance tuning')],
  },
  {
    group: 'Infra & Cloud',
    items: ['AWS EC2', 'Linux', 'DevOps', 'Raspberry Pi', 'Git'],
  },
  {
    group: L('Gestão & Estratégia', 'Management & Strategy'),
    items: [
      'OKR',
      'Scrum',
      L('Gestão de processos e riscos', 'Process & risk management'),
      L('Análise SWOT', 'SWOT analysis'),
      L('Diretrizes estratégicas', 'Strategic guidelines'),
    ],
  },
]
