import { fetchWrapper } from '../api';
import { PageValue, UserHours } from './types';

export const getUserHours = async (token: string): Promise<UserHours> => {
  const response: UserHours = await fetchWrapper(`api/aluno/horas`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const pagination = async ({
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
      `api/aluno/requisicao/paginacao?pagina=${pag}&quantidade=${value}`,
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
