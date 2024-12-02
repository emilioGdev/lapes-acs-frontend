export interface getCertificateInterface {
  id?: number;
  titulo: string;
  observacao: string;
  dataInicial: string;
  dataFinal: string;
  eixoAtividade: string;
  quantidadeDeHoras: number;
  atividade: string;
  statusCertificado: string;
  cargaHoraria: number;
}

export interface newCertificateInterface {
  certificate: File;
}

export interface createCertificate {
  token: string;
  id: number;
}

export interface CreateCertificates {
  titulo: string;
  dataIncial: string;
  dataFinal: string;
  quantidadeDeHoras: number | undefined;
  atividadeId: number;
}
