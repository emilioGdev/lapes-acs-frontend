import { Certificate } from '../../../../services/request/types';
export type ViewRequestProps = {
  id?: number;
  dataDeSubmissao?: Date;
  requisicaoStatus?: string;
  observacao?: string;
  certificados?: Array<Certificate>;
  typeUser?: string;
};
export interface StatusCheckInterface {
  [key: string]: string;
}
