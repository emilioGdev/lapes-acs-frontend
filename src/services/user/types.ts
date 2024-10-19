import { Endereco } from './../cep/types';
export interface UserInformation {
  id: number;
  nomeCompleto: string;
  matricula: string;
  telefone: string;
  email: string;
  perfis: Array<string>;
  curso: CourseInfo;
  periodo: string;
  verificado: boolean;
  endereco: Endereco;
}

export interface CourseInfo {
  id: number;
  nome: string;
}
