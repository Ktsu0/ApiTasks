export interface TaskBD {
  title: string; // Título da tarefa
  description: string; // Descrição detalhada
  done: boolean; // Se a tarefa foi concluída ou não
  cargo: 'dev' | 'design' | 'gerente' | 'PO' | 'marketing'; // Cargo responsável
}
