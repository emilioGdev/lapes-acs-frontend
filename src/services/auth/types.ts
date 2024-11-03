export interface Login {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateUser {
  nomeCompleto: string;
  cpf: string;
  matricula: string;
  periodo: number;
  telefone: string;
  email: string;
  senha: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  numero: number;
  cursoId: number;
  uf: string;
  complemento?: string;
}

export interface VerificacaoResponse {
  verificado: boolean;
  // outras propriedades, se houver...
}

export interface NewPassInterface {
  token: string;
  password: string;
}
