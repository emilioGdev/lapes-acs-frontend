import { Course } from '../courses/types';
import { UserInformation } from '../user/types';

export interface UserRequest {
  certificados?: Array<Certificate>;
  id: number;
  dataDeSubmissao: Date;
  quantidadeDeHoras: number;
  requisicaoStatus: string;
  observacao?: string;
}

export interface Certificate {
  id?: number;
  cargaHoraria: number;
  titulo: string;
  data?: Date;
  dataInicial: Date;
  dataFinal: Date;
  atividade: string;
  eixoAtividade: string;
  statusCertificado: string;
}

export interface RequestId {
  id: number;
}

export interface PageValue {
  paginaAtual: number;
  requisicoes: Array<RequestPagination>;
  totalItens: number;
  totalPaginas: number;
}

export interface RequestPagination {
  id: number;
  data: Date;
  quantidadeDeHoras: number;
  status: string;
  comissao?: UserInformation;
}

export interface Commission {
  id: number;
  nomeCompleto: string;
  matricula: string;
  email: string;
  curso: Course;
}
