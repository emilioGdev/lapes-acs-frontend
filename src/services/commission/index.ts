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

export const commissionTransitPagination = async ({
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
      `api/comissao/transito?pagina=${pag}&quantidade=${value}`,
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

export const commissionConcluidedPagination = async ({
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
      `api/comissao/concluidas?pagina=${pag}&quantidade=${value}`,
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
  observation: string,
  hours: number
) => {
  const params = new URLSearchParams({
    certificadoId: certificateId.toString(),
    status,
    observacao: observation,
    cargaHoraria: hours.toString()
  });

  await fetchWrapperTest(`api/comissao/certificados?${params}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};
