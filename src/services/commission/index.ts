import { fetchWrapper } from '../api';
import { fetchWrapperTest } from '../apiTest';
import { PageValue } from './types';

export const commissionPagination = async ({
  token,
  pag,
  value
}: {
  token: string;
  pag: number;
  value: number;
}): Promise<PageValue> => {
  try {
    const response: PageValue = await fetchWrapper(
      `api/comissao?pagina=${pag}&quantidade=${value}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  } catch (error) {
    console.error('erro', error);
    throw error;
  }
};

export const evaluateCertificate = async (
  token: string,
  certificateId: number,
  status: string,
  obsevation: string,
  hours: number
): Promise<void> => {
  console.log('token 2' + token);
  console.log('id do certificado 2' + certificateId);
  console.log('status 2' + status);
  console.log('observacao 2' + obsevation);
  console.log('horas 2' + hours);
  await fetchWrapperTest(
    `api/comissao/certificados?
      certificadoId=${certificateId.toString()}
      &status=${status}
      &observacao=${obsevation}
      &cargaHoraria=${hours}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};
