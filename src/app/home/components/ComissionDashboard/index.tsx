'use client';

import { useEffect, useState } from 'react';

import { PaginationComp } from '../../../../components/PaginationComp';
import { commissionPagination } from '../../../../services/commission';
import { PageValue } from '../../../../services/commission/types';
import { RequestList } from '../RequestList';
import * as S from './styles';

import Cookies from 'js-cookie';
import moment from 'moment';

export const Comission = () => {
  const token = Cookies.get('token') || '';
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [reloadEffect, setReloadEffect] = useState<number>(0);
  const [requestsPag, setRequestsPag] = useState<PageValue>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [archive, setArchive] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<number>();

  useEffect(() => {
    const requestPagination = async (page: number) => {
      const paginationResponse = await commissionPagination({
        token,
        pag: page,
        value: 3
      });

      const paginationResponseCompleted = await commissionPagination({
        token,
        pag: 0,
        value: 999999999
      });

      const total = paginationResponseCompleted.requisicoes.length;
      const completed = paginationResponseCompleted.requisicoes.filter((item) =>
        ['ACEITO', 'NEGADO', 'PROBLEMA'].includes(item.status)
      ).length;

      setRequestsPag(paginationResponse);
      setCompletedTasks(completed);
      setTotalTasks(total);
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
      <S.RequisicoesArea>
        {requestsPag && requestsPag.totalPaginas > 0 ? (
          <>
            {requestsPag.requisicoes
              .filter((item) => ['TRANSITO'].includes(item.status))
              .map((item) => (
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
