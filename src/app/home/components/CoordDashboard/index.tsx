'use client';

import { useEffect, useState } from 'react';

import { PaginationComp } from '../../../../components/PaginationComp';
import { coordPagination } from '../../../../services/coordinator';
import { PageValue } from '../../../../services/coordinator/types';
import { RequestList } from '../RequestList';
import * as S from './style';

import Cookies from 'js-cookie';
import moment from 'moment';

export const Coord = () => {
  // const buttonData = [
  //   { grade: 'ES 19.1' },
  //   { grade: 'ES 20.1' },
  //   { grade: 'ES 21.1' },
  //   { grade: 'ES 22.1' },
  //   { grade: 'ES 23.1' },
  //   { grade: 'ES 24.1' }
  // ];

  const token = Cookies.get('token') || '';
  const totalTasks = 100;
  const [completedTasks, setCompletedTasks] = useState<number>(40);
  const [reloadEffect, setReloadEffect] = useState<number>(0);
  const [requestsPag, setRequestsPag] = useState<PageValue>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [archive, setArchive] = useState<boolean>(false);

  useEffect(() => {
    const requestPagination = async (page: number) => {
      const paginationResponse = await coordPagination({
        token,
        pag: page,
        value: 3
      });
      setRequestsPag(paginationResponse);
    };
    setArchive(false);
    requestPagination(currentPage);
  }, [token, currentPage, reloadEffect]);

  const percentage = (completedTasks / totalTasks) * 100;

  function reloadPag() {
    setReloadEffect((prev) => prev + 1);
  }

  const handlePageChangeNext = () => {
    if (requestsPag !== undefined) {
      if (currentPage < requestsPag.totalPaginas - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePageChangeBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <S.FunctionContainer>
      {/*<S.TurmasArea>
        <S.H2Title>Turmas</S.H2Title>
        <S.TurmaSelect>
          <ArrowCircleLeft size={32} />
          {buttonData.map((data, key) => (
            <button key={key}>{data.grade}</button>
          ))}
          <ArrowCircleRight size={32} />
        </S.TurmaSelect>
      </S.TurmasArea>*/}
      <S.ContadorArea>
        <S.ContadorLabel>
          <label>Lidas:</label>
          <label>
            {completedTasks}/{totalTasks}
          </label>
        </S.ContadorLabel>
        <S.Contador
          width={`${percentage}%`}
          color="#5EBC4F"
          radius="1rem 0 0 1rem"
        />
      </S.ContadorArea>
      <S.ControladorArea>
        <S.H2Title>Solicitações em Andamento</S.H2Title>
      </S.ControladorArea>
      <S.RequisicoesArea>
        {requestsPag && requestsPag.totalPaginas > 0 ? (
          <>
            {requestsPag.requisicoes.map((item) => (
              <RequestList
                status={item.status}
                id={item.id}
                initialDate={
                  item.data == null
                    ? 'Aguardando envio'
                    : moment(item.data).format('DD/MM/YYYY')
                }
                hours={item.quantidadeDeHoras}
                key={item.id}
                token={token}
                isDraft={false}
                reloadRequestDelete={reloadPag}
                reloadRequestArchive={reloadPag}
                type={archive}
                typeUser="COORDENADOR"
                reload={reloadPag}
              />
            ))}
          </>
        ) : (
          <S.H3Title>Nenhuma solicitação registrada...</S.H3Title>
        )}
      </S.RequisicoesArea>
      <S.PaginationDiv>
        {requestsPag && requestsPag.totalPaginas > 1 ? (
          <>
            <PaginationComp
              handlePageChangeBack={handlePageChangeBack}
              handlePageChangeNext={handlePageChangeNext}
              allPage={requestsPag.totalPaginas}
              page={requestsPag.paginaAtual + 1}
            />
          </>
        ) : (
          <></>
        )}
      </S.PaginationDiv>
    </S.FunctionContainer>
  );
};
