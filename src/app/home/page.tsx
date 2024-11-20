'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

//import { request } from '../../services/request';
//import { UserRequest } from '../../services/request/types';

import { getUserInformation } from '../../services/user';
import { UserInformation } from '../../services/user/types';
import { Comission } from './components/ComissionDashboard';
import { Coord } from './components/CoordDashboard';
import { Student } from './components/StudentDashboard';
import * as S from './style';

import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const token = Cookies.get('token') || '';
  const [userInfo, setUserInfo] = useState<UserInformation>();
  const [reloadEffect, setReloadEffect] = useState<number>(0);

  useEffect(() => {
    const userInfo = async () => {
      const userResponse = await getUserInformation(token);
      setUserInfo(userResponse);
    };
    userInfo();
  }, [token, reloadEffect]);

  function reloadPag() {
    setReloadEffect((prev) => prev + 1);
  }

  return (
    <S.Container>
      <S.ContentDiv>
        <S.TitleDiv>
          {userInfo && (
            <S.UserName $Student={userInfo.perfis[0] == 'ALUNO'}>
              {`Bem vindo(a)`}, {userInfo.nomeCompleto.split(' ')[0]}!
            </S.UserName>
          )}

          <S.Line />
        </S.TitleDiv>
        {userInfo && userInfo.perfis[0] == 'ALUNO' && (
          <Student userInfo={userInfo} router={router} />
        )}
        {userInfo && userInfo.perfis[0] == 'COMISSAO' && <Comission />}

        {userInfo && userInfo.perfis[0] == 'COORDENADOR' && <Coord />}
      </S.ContentDiv>
    </S.Container>
  );
}
