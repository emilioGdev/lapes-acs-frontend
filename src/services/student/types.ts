export interface UserHours {
  horasExtensao: number;
  horasGestao: number;
  horasEnsino: number;
  horasPesquisa: number;
  horasTotaisCurso: number;
  horasExtensaoPercentual: string;
  horasGestaoPercentual: string;
  horasEnsinoPercentual: string;
  horasPesquisaPercentual: string;
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
}
