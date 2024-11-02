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

export interface ArchiveInterface {
  token: string;
  id: number;
}

export interface ResponseArchiveInterface {
  requisicoes: Array<UserRequest>;
}
