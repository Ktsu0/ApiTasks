// Representação dos cargos
export enum Cargo {
  Dev = 'DEV',
  Design = 'DESING',
  Gerente = 'GERENTE',
  PO = 'PO',
  Marketing = 'MARKETING',
}

// Estrutura do usuário
export interface User {
  nome: string;
  email: string;
  password: string;
  cargo: Cargo;
}
