import { fetchWrapper } from '../api';
import { fetchWrapperTest } from '../apiTest';
import { Commission, PageValue } from './types';

export const coordPagination = async ({
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
      `api/coordenador?pagina=${pag}&quantidade=${value}`,
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

export const CommissionList = async (
  token: string
): Promise<Array<Commission>> => {
  try {
    const response: Array<Commission> = await fetchWrapper(
      `api/coordenador/comissao`,
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

export const coordConcluiedlist = async ({
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
      `api/coordenador/requisicoes/comissao?pagina=${pag}&quantidade=${value}`,
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

export const sendToTeacher = async (
  token: string,
  teacherId: number,
  requestId: number
): Promise<void> => {
  await fetchWrapperTest(
    `api/coordenador/requisicao?comissaoId=${teacherId}&requisicaoId=${requestId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};
