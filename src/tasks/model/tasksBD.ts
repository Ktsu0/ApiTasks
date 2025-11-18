import { TaskBD } from './tasks.model';

export const tasks: TaskBD[] = [
  // DEV
  {
    title: 'Implementar API',
    description: 'Criar endpoints para sistema de login',
    done: false,
    cargo: 'dev',
  },
  {
    title: 'Refatorar código',
    description: 'Melhorar legibilidade e performance do módulo auth',
    done: false,
    cargo: 'dev',
  },
  {
    title: 'Testes unitários',
    description: 'Criar testes para o serviço de autenticação',
    done: false,
    cargo: 'dev',
  },
  {
    title: 'Documentação',
    description: 'Documentar endpoints e DTOs',
    done: false,
    cargo: 'dev',
  },
  {
    title: 'Deploy',
    description: 'Enviar aplicação para ambiente de staging',
    done: false,
    cargo: 'dev',
  },

  // DESIGN
  {
    title: 'Criar wireframes',
    description: 'Desenhar telas iniciais do sistema',
    done: false,
    cargo: 'design',
  },
  {
    title: 'Definir paleta',
    description: 'Escolher cores do projeto',
    done: false,
    cargo: 'design',
  },
  {
    title: 'Iconografia',
    description: 'Criar ícones consistentes para a interface',
    done: false,
    cargo: 'design',
  },
  {
    title: 'Prototipagem',
    description: 'Criar protótipo navegável no Figma',
    done: false,
    cargo: 'design',
  },
  {
    title: 'Revisão UI',
    description: 'Revisar consistência visual e acessibilidade',
    done: false,
    cargo: 'design',
  },

  // GERENTE
  {
    title: 'Planejar sprints',
    description: 'Organizar backlog e definir prioridades',
    done: false,
    cargo: 'gerente',
  },
  {
    title: 'Reunião diária',
    description: 'Verificar progresso da equipe',
    done: false,
    cargo: 'gerente',
  },
  {
    title: 'Aprovar PRs',
    description: 'Revisar pull requests críticos',
    done: false,
    cargo: 'gerente',
  },
  {
    title: 'Avaliar desempenho',
    description: 'Dar feedbacks e acompanhar KPIs',
    done: false,
    cargo: 'gerente',
  },
  {
    title: 'Relatório semanal',
    description: 'Preparar relatório de progresso do projeto',
    done: false,
    cargo: 'gerente',
  },

  // PO
  {
    title: 'Definir backlog',
    description: 'Priorizar funcionalidades do produto',
    done: false,
    cargo: 'PO',
  },
  {
    title: 'Refinar histórias',
    description: 'Especificar critérios de aceitação',
    done: false,
    cargo: 'PO',
  },
  {
    title: 'Reunião com stakeholders',
    description: 'Coletar feedback e alinhar expectativas',
    done: false,
    cargo: 'PO',
  },
  {
    title: 'Aceitar entregas',
    description: 'Validar funcionalidades entregues',
    done: false,
    cargo: 'PO',
  },
  {
    title: 'Atualizar roadmap',
    description: 'Atualizar plano estratégico do produto',
    done: false,
    cargo: 'PO',
  },

  // MARKETING
  {
    title: 'Planejar campanha',
    description: 'Definir público e canais de divulgação',
    done: false,
    cargo: 'marketing',
  },
  {
    title: 'Criar conteúdo',
    description: 'Produzir textos e artes para redes sociais',
    done: false,
    cargo: 'marketing',
  },
  {
    title: 'Analisar métricas',
    description: 'Verificar performance das campanhas',
    done: false,
    cargo: 'marketing',
  },
  {
    title: 'SEO',
    description: 'Otimizar conteúdo para buscadores',
    done: false,
    cargo: 'marketing',
  },
  {
    title: 'Email marketing',
    description: 'Criar e enviar newsletters para clientes',
    done: false,
    cargo: 'marketing',
  },
];
