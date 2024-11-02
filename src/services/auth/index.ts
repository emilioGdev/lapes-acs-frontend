import { fetchWrapper } from '../api';
import { fetchWrapperTest } from '../apiTest';
import { CreateUser, LoginResponse } from './types';

export const login = async (signInData: object): Promise<LoginResponse> => {
  const response = await fetchWrapper<LoginResponse>('api/auth/acesso/login', {
    method: 'POST',
    body: JSON.stringify(signInData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const createUser = async (signUpData: object): Promise<object> => {
  const response = await fetchWrapper<CreateUser>('api/auth/acesso/cadastro', {
    method: 'POST',
    body: JSON.stringify(signUpData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const verificarCodigo = async (
  codigoVerificacao: string,
  token: string
) => {
  const response = await fetchWrapperTest(
    `api/auth/verificacao?codigoDeVerificacao=${codigoVerificacao}`,
    {
      method: 'POST',
      body: JSON.stringify(codigoVerificacao),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response;
};

export const sendVerificationEmail = async (token: string) => {
  const response = await fetchWrapperTest(`api/auth/verificacao/novo`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export const sendNewPass = async (token: string, password: object) => {
  const response = await fetchWrapperTest(`api/auth/alterar-senha`, {
    method: 'POST',
    body: JSON.stringify(password),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

export const sendRecovey = async (email: string) => {
  const response = await fetchWrapperTest(
    `api/auth/acesso/senha/esquecer?email=${email}`,
    {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const authenticateUser = async (
  id: number,
  authCode: string
): Promise<void> => {
  const requestBody = {
    usuarioId: id,
    codigoDeVerificacao: authCode
  };
  await fetchWrapper(`api/auth/verificacao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
};
