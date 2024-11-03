import { fetchWrapper } from '../api';
import { fetchWrapperTest } from '../apiTest';
import { UserRequest } from './types';

export const getRequest = async (
  id: number | undefined,
  token: string
): Promise<UserRequest> => {
  const response: UserRequest = await fetchWrapper(`api/requisicao/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const submitRequest = async (
  id: number,
  token: string
): Promise<object> => {
  const response = await fetchWrapperTest(`api/requisicao/submissão/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export const deleteRequest = async (
  id: number,
  token: string
): Promise<void> => {
  await fetchWrapperTest(`api/requisicao/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const archived = async (token: string, id: number): Promise<void> => {
  await fetchWrapperTest(`api/requisicao/arquivar/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const DontArchived = async (
  token: string,
  id: number
): Promise<void> => {
  await fetchWrapperTest(`api/requisicao/desarquivar/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const getArchived = async (
  token: string
): Promise<Array<UserRequest>> => {
  try {
    const response: Array<UserRequest> = await fetchWrapper(
      `api/requisicao/arquivar`,
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

export const downloadPDF = async (token: string, idRequisicao: number) => {
  try {
    const response = await fetchWrapperTest(
      `api/requisicao/${idRequisicao}/pdf`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      //   console.log(response);
      return response;
    } else {
      console.error('Erro ao baixar o PDF');
      return null; // Retorna null em caso de erro
    }
  } catch (error) {
    console.error('Erro ao realizar a requisição:', error);
    return null; // Retorna null em caso de erro
  }
};

export const newRequest = async (token: string): Promise<number> => {
  const data: number = await fetchWrapper<number>(`api/requisicao`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return data;
};
