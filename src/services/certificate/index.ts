import { fetchWrapper } from '../api';
import { fetchWrapperTest } from '../apiTest';
import { getCertificateInterface } from './types';

export const certificateData = async ({
  token,
  id
}: {
  token: string;
  id: number;
}): Promise<getCertificateInterface> => {
  const response: getCertificateInterface = await fetchWrapper(
    `api/certificado/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
};

export const deleteCertificate = async (
  id: number,
  token: string
): Promise<void> => {
  await fetchWrapperTest(`api/certificado/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const newCertificate = async (
  token: string,
  id: number,
  certificate: File
): Promise<number> => {
  const formData = new FormData();
  formData.append('requisicaoId', String(id));
  formData.append('certificado', certificate);

  // Realizar a solicitação usando o fetch
  const data = await fetchWrapper<number>(`api/certificado`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData // Usar o objeto FormData contendo os dados do arquivo e outros campos
  });
  return data;
};

export const exibirPDF = async (
  token: string, // Recebe o token como parâmetro
  idCertificado: number
) => {
  const response = await fetchWrapperTest(
    `api/certificado/${idCertificado}/pdf`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Adicionar o token ao cabeçalho da requisição
      }
    }
  );

  return response;
};

export const createCertificate = async (
  certificateData: object,
  id: number,
  token: string
) => {
  await fetchWrapperTest(`api/certificado/${id}`, {
    method: 'PUT',
    body: JSON.stringify(certificateData),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};
