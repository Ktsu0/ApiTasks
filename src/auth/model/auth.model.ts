// Representação dos cargos
export enum Cargo {
  Dev = 'DEV',
  Design = 'DESIGN',
  Gerente = 'GERENTE',
  PO = 'PO',
  Marketing = 'MARKETING',
}

// Estrutura do usuário
export interface User {
  name: string;
  email: string;
  password: string;
  role: Cargo;
}
