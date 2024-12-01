'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PaginationComp } from '../../components/PaginationComp';
import { commissionPagination } from '../../services/commission';
import { PageValue } from '../../services/coordinator/types';
import { RequestList } from '../home/components/RequestList';
import * as S from './styles';

import { Funnel } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import moment from 'moment';

export default function SolicitacoesConcluidasComissao() {
  const [reloadEffect, setReloadEffect] = useState<number>(0);
  const [requestsPag, setRequestsPag] = useState<PageValue>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [archive, setArchive] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get('token') || '';

  useEffect(() => {
    const requestPagination = async (page: number) => {
      const paginationResponse = await commissionPagination({
        token,
        pag: page,
        value: 99999
      });
      setRequestsPag(paginationResponse);
    };
    setArchive(false);
    requestPagination(currentPage);
  }, [token, currentPage, reloadEffect]);

  function backHome() {
    router.push('/home');
  }

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

  console.log(requestsPag);

  return (
    <S.Container>
      <S.Content>
        <S.TitleDiv>
          <S.Title>Solicitações Concluidas</S.Title>
          <S.Line />
        </S.TitleDiv>
        <S.FilterDiv>
          <S.InputRequestDiv>
            {/* <S.RegisterInput
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={handleSearchChange}
            /> */}
            <S.IconButton>
              <Funnel size={28} weight="fill" />
            </S.IconButton>
          </S.InputRequestDiv>
          <S.BackDiv>
            <S.BackButton label="Voltar" onClick={backHome} />
          </S.BackDiv>
        </S.FilterDiv>
        <S.RequestDiv>
          {requestsPag && requestsPag.totalPaginas > 0 ? (
            <>
              {requestsPag.requisicoes
                .filter((item) =>
                  ['ACEITO', 'PROBLEMA', 'NEGADO'].includes(item.status)
                )
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
            <p>Nenhuma solicitação registrada...</p>
          )}
        </S.RequestDiv>

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
      </S.Content>
    </S.Container>
  );
}
