import { useEffect, useState } from 'react';
import React from 'react';

import { errorToast } from '../../../../functions/errorToast';
import { sucessToast } from '../../../../functions/sucessToast';
import { warnToast } from '../../../../functions/warnToast';
import { Endereco } from '../../../../services/address/types';
import { fetchWrapper } from '../../../../services/api';
import { createUser } from '../../../../services/auth';
import { CreateUser } from '../../../../services/auth/types';
import { getCourses } from '../../../../services/courses';
import { Course } from '../../../../services/courses/types';
import { checkCep } from './functions/checkCep';
import { checkCourse } from './functions/checkCourse';
import { checkCPF } from './functions/checkCpf';
import { checkEmail } from './functions/checkEmail';
import { checkGrade } from './functions/checkGrade';
import { checkName } from './functions/checkName';
import { checkPassWord } from './functions/checkPassword';
import { checkPhone } from './functions/checkPhone';
import { checkRegistry } from './functions/checkRegistry';
import { checkSamePass } from './functions/checkSamePass';
import { useErrorInput } from './hooks/useErrorInput';
import { useSetInput } from './hooks/useSetInput';
import { useSetLock } from './hooks/useSetLock';
import * as S from './style';

import { MapPin, User, Eye, EyeSlash } from '@phosphor-icons/react';

type ComponentProps = {
  close: () => void;
};

export function Register({ close }: ComponentProps) {
  const [coursesData, setCoursesData] = useState<Course[]>([]);

  useEffect(() => {
    const courses = async () => {
      try {
        const courseResponse = await getCourses();
        if (Array.isArray(courseResponse)) {
          setCoursesData(courseResponse);
        } else {
          setCoursesData([]);
        }
      } catch (error) {
        errorToast('Ocorreu um erro');
      }
    };

    courses();
  }, []);

  // hooks usados para setar mensagem de erros dos inputs - jamu
  const {
    errorName,
    setErrorName,
    errorCpf,
    setErrorCpf,
    errorPhone,
    setErrorPhone,
    errorGrade,
    setErrorGrade,
    errorEmail,
    setErrorEmail,
    errorCourse,
    setErrorCourse,
    errorPass,
    setErrorPass,
    errorSamePass,
    setErrorSamePass,
    errorNumber,
    setErrorNumber,
    errorCep,
    setErrorCep,
    errorRegistry,
    setErrorRegistry
  } = useErrorInput();

  // hooks para capturar os valores setados nos inputs - jamu
  const {
    userName,
    setUserName,
    userCpf,
    setUserCpf,
    userPhone,
    setUserPhone,
    userGrade,
    setUserGrade,
    userEmail,
    setUserEmail,
    userCourse,
    setUserCourse,
    userPass,
    setUserPass,
    setUserSamePass,
    userNumber,
    setUserNumber,
    userCep,
    setUserCep,
    userCity,
    setUserCity,
    userBlock,
    setUserBlock,
    userUf,
    setUserUf,
    userStreet,
    setUserStreet,
    userComplement,
    setUserComplement,
    userRegistry,
    setUserRegistry
  } = useSetInput();

  //hook para o botão de visualizar senha - jamu
  const [visibility, setVisibility] = useState<boolean>(false);

  //hooks para ativar e desativar inputs - jamu
  const {
    cityLock,
    setCityLock,
    ufLock,
    setUfLock,
    blockLock,
    setBlockLock,
    streetLock,
    setStreetLock
  } = useSetLock();

  //funções de handle para captar os valores dos input - jamu
  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserName(value);
    setErrorName(!checkName(value));
  };

  const handleChangeCpf = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserCpf(value);
    setErrorCpf(checkCPF(value));
  };

  const handleChangePhone = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserPhone(value);
    setErrorPhone(checkPhone(value));
  };

  const handleChangeGrade = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserGrade(value);
    setErrorGrade(checkGrade(parseInt(value)));
  };

  const handleChangeEmail = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserEmail(value);
    setErrorEmail(checkEmail(value));
  };

  const handleChangePass = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserPass(value);
    setErrorPass(checkPassWord(value));
  };

  const handleChangeSamePass = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserSamePass(value);
    setErrorSamePass(checkSamePass(userPass, value));
  };

  const handleChangeNumber = (e: { target: { value: string } }) => {
    const { value } = e.target;

    // Verifique se o valor é composto apenas por números
    if (/^[0-9]+$/.test(value)) {
      setUserNumber(value);
      setErrorNumber(true);
    } else {
      setErrorNumber(false);
    }
  };
  const handleChangeRegistry = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserRegistry(value);
    setErrorRegistry(checkRegistry(value));
  };

  const handleChangeCourser = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserCourse(value);
    setErrorCourse(checkCourse(value));
  };

  const handleChangeCEP = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserCep(value);
    setErrorCep(checkCep(value));

    if (checkCep(value)) {
      fetchCep(value);
    }
  };

  const handleChangeCity = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserCity(value);
  };
  const handleChangeUf = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserUf(value);
  };
  const handleChangeBlock = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserBlock(value);
  };
  const handleChangeStreet = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserStreet(value);
  };

  const handleTogglePassVisibility = () => {
    setVisibility(!visibility);
  };

  const handleChangeComplement = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setUserComplement(value);
  };

  //chamada da api do cep - jamu
  const fetchCep = async (cep: string): Promise<void> => {
    try {
      const data = await fetchWrapper<Endereco>(`api/endereco/${cep}`);
      checkCity(data.cidade);
      checkBlock(data.bairro);
      checkStreet(data.rua);
      checkUf(data.uf);
    } catch (err) {
      console.log(err);
      setErrorCep(false); // Define errorCep como false em caso de erro
    }
  };

  //Funções de check da resposta da api do cep para cada campo - jamu

  const checkCity = (name: string) => {
    if (name === '') {
      setCityLock(false);
      setUserCity('Cidade');
    }
    setUserCity(name);
  };

  const checkUf = (name: string) => {
    if (name === '') {
      setUfLock(false);
      setUserUf('UF');
    }
    setUserUf(name);
  };

  const checkBlock = (name: string) => {
    if (name === '') {
      setBlockLock(false);
      setUserBlock('Bairro');
    }
    setUserBlock(name);
  };
  const checkStreet = (name: string) => {
    if (name === '') {
      setStreetLock(false);
      setUserStreet('Rua');
    }
    setUserStreet(name);
  };

  const signUpData: CreateUser = {
    nomeCompleto: userName,
    cpf: userCpf,
    matricula: userRegistry,
    periodo: parseInt(userGrade),
    telefone: userPhone,
    email: userEmail,
    senha: userPass,
    cep: userCep,
    rua: userStreet,
    bairro: userBlock,
    cidade: userCity,
    numero: parseInt(userNumber),
    cursoId: parseInt(userCourse),
    uf: userUf,
    complemento: userComplement
  };

  //função disparda quando botão cadastrar é acionado - jamu

  const registerUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (
        errorName &&
        errorCpf &&
        errorPhone &&
        errorCourse &&
        errorGrade &&
        errorEmail &&
        errorRegistry &&
        errorPass &&
        errorSamePass &&
        errorCep &&
        errorNumber == true
      ) {
        await createUser(signUpData);
        sucessToast('Cadastro realizado com sucesso! Realize o login');
        close();
      } else {
        warnToast('Preencha todos os campos corretamente para cadastrar!');
      }
    } catch (error) {
      if (
        (error as { mensagem: string }).mensagem ===
        'Os dados a seguir /email já estão cadastrados!'
      ) {
        warnToast(`${(error as { mensagem: string }).mensagem}`);
      } else {
        errorToast('Houve algum erro ao tentar se cadastrar!');
        console.log(error);
      }
    }
  };

  return (
    <S.Container>
      {/* container principal */}
      <S.BlueBarContainer /> {/* barra azul lateral */}
      {/* constainer com o regsitro inteiro*/}
      <S.RegisterContainer>
        {/* */}
        <S.Div>
          <S.RegisterTitle $principal>Cadastro</S.RegisterTitle>
        </S.Div>
        <S.Line />
        <S.Div>
          {/* Registro do usuário*/}
          <S.TitleDiv>
            <User size={25} weight="bold" />
            <S.RegisterTitle>Dados Pessoais:</S.RegisterTitle>
          </S.TitleDiv>
          <S.InputDiv>
            <S.InsideDiv $col="span 2 / span 2">
              <S.RegisterInput
                label="Nome Completo:"
                placeholder="Nome Completo"
                onChange={handleChangeName}
              />
              {!errorName && (
                <S.ErroMessage>
                  *Insira um nome entre 2 e 80 letras
                </S.ErroMessage>
              )}
            </S.InsideDiv>
            <S.InsideDiv>
              <S.ComponentsContainer>
                <S.Label>Cpf:</S.Label>
                <S.RegisterInputMask
                  mask="999.999.999-99"
                  placeholder="___.___.___.__"
                  onChange={handleChangeCpf}
                />
                {!errorCpf && (
                  <S.ErroMessage>*Insira um CPF válido</S.ErroMessage>
                )}
              </S.ComponentsContainer>
            </S.InsideDiv>
            <S.InsideDiv>
              <S.ComponentsContainer>
                <S.Label>Telefone:</S.Label>
                <S.RegisterInputMask
                  mask="(99) 9 9999-9999"
                  placeholder="(__) _ ____-____"
                  onChange={handleChangePhone}
                />
                {!errorPhone && (
                  <S.ErroMessage>*Insira um telefone brasileiro</S.ErroMessage>
                )}
              </S.ComponentsContainer>
            </S.InsideDiv>
            <S.InsideDiv>
              <S.ComponentsContainer>
                <S.Label>Cursos:</S.Label>
                <S.RegisterSelect onChange={handleChangeCourser}>
                  <S.SelectOption value="">Cursos</S.SelectOption>
                  {coursesData.map((item) => (
                    <S.SelectOption value={item.id} key={item.id}>
                      {item.nome}
                    </S.SelectOption>
                  ))}
                </S.RegisterSelect>
              </S.ComponentsContainer>
              {!errorCourse && (
                <S.ErroMessage>*Selecione um curso</S.ErroMessage>
              )}
            </S.InsideDiv>
            <S.InsideDiv>
              <S.RegisterInput
                label="Período:"
                placeholder="Período"
                type="number"
                min={1}
                max={12}
                onChange={handleChangeGrade}
              />
              {!errorGrade && (
                <S.ErroMessage>*Insira um período válido</S.ErroMessage>
              )}
            </S.InsideDiv>
            <S.InsideDiv $col="span 2 / span 2">
              <S.RegisterInput
                label="E-mail:"
                placeholder="Ex: exemplo@upe.br"
                type="email"
                onChange={handleChangeEmail}
              />
              {!errorEmail && (
                <S.ErroMessage>
                  *Insira um email de domínio da upe
                </S.ErroMessage>
              )}
            </S.InsideDiv>
            <S.InsideDiv>
              <S.RegisterInput
                label="Matrícula:"
                placeholder="Matrícula"
                type="text"
                onChange={handleChangeRegistry}
              />
              {!errorRegistry && (
                <S.ErroMessage>
                  *Insira um número de matrícula válido
                </S.ErroMessage>
              )}
            </S.InsideDiv>

            <S.InsideDiv>
              <S.RegisterInput
                label="Senha:"
                placeholder="Senha"
                type={visibility ? 'text' : 'password'}
                onChange={handleChangePass}
                endAdornment={
                  <button onClick={handleTogglePassVisibility}>
                    {visibility ? <Eye size={32} /> : <EyeSlash size={32} />}
                  </button>
                }
              />
              {!errorPass && (
                <S.ErroMessage>
                  *Insira uma senha entre 8 e 16 caracteres, que possua pelo
                  menos um número, uma letra maiúscula, uma minúsucla e um
                  símbolo{' (!@#$%^&*()_+-)'}
                </S.ErroMessage>
              )}
            </S.InsideDiv>

            <S.InsideDiv>
              <S.RegisterInput
                label="Confirme Sua Senha:"
                placeholder="Senha"
                type={visibility ? 'text' : 'password'}
                onChange={handleChangeSamePass}
                endAdornment={
                  <button onClick={handleTogglePassVisibility}>
                    {visibility ? <Eye size={32} /> : <EyeSlash size={32} />}
                  </button>
                }
              />
              {!errorSamePass && (
                <S.ErroMessage>*Insira a mesma senha</S.ErroMessage>
              )}
            </S.InsideDiv>
          </S.InputDiv>
        </S.Div>
        <S.Div>
          {/* Registro do endereço*/}
          <S.TitleDiv>
            <MapPin size={32} weight="bold" />
            <S.RegisterTitle>Endereco:</S.RegisterTitle>
          </S.TitleDiv>
          <S.InputDiv>
            <S.InsideDiv>
              <S.ComponentsContainer>
                <S.Label>CEP:</S.Label>
                <S.RegisterInputMask
                  mask="99999-999"
                  placeholder="_____-___"
                  onChange={handleChangeCEP}
                />
                {!errorCep && (
                  <S.ErroMessage>*Insira um cep valido</S.ErroMessage>
                )}
              </S.ComponentsContainer>
            </S.InsideDiv>
            <S.InsideDiv>
              <S.RegisterInput
                label="Cidade:"
                placeholder="Cidade"
                disabled={cityLock}
                value={userCity}
                onChange={handleChangeCity}
              />
            </S.InsideDiv>

            <S.InsideDiv>
              <S.RegisterInput
                label="UF:"
                placeholder="UF"
                disabled={ufLock}
                value={userUf}
                onChange={handleChangeUf}
              />
            </S.InsideDiv>
            <S.InsideDiv>
              <S.RegisterInput
                label="Bairro:"
                placeholder="Bairro"
                disabled={blockLock}
                value={userBlock}
                onChange={handleChangeBlock}
              />
            </S.InsideDiv>
            <S.InsideDiv>
              <S.RegisterInput
                label="Rua:"
                placeholder="Rua"
                disabled={streetLock}
                value={userStreet}
                onChange={handleChangeStreet}
              />
            </S.InsideDiv>
            <S.InsideDiv>
              <S.RegisterInput
                label="Número:"
                placeholder="Número"
                onChange={handleChangeNumber}
              />
              {!errorNumber && (
                <S.ErroMessage>*Insira um número valido</S.ErroMessage>
              )}
            </S.InsideDiv>
            <S.InsideDiv $col="span 3 / span 2">
              <S.RegisterInput
                label="Complemento:"
                placeholder="Ex: Apartamento 10"
                onChange={handleChangeComplement}
              />
            </S.InsideDiv>
          </S.InputDiv>
        </S.Div>
        <S.ButtonDiv>
          <S.RegisterButton onClick={registerUser}>Cadastrar</S.RegisterButton>
        </S.ButtonDiv>
      </S.RegisterContainer>
    </S.Container>
  );
}
