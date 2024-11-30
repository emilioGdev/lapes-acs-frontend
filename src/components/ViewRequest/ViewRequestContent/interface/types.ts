import { Certificate } from '../../../../services/request/types';
export type ViewRequestProps = {
  id?: number;
  dataDeSubmissao?: Date;
  requisicaoStatus?: string;
  observacao?: string;
  certificados?: Array<Certificate>;
  typeUser?: string;
  onCloseModal?: () => void;
  reload?: () => void;
};
export interface StatusCheckInterface {
  [key: string]: string;
}
