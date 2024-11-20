import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState, useEffect } from 'react';

import FilterRequests from '../../../../components/FilterRequests';
import { PaginationComp } from '../../../../components/PaginationComp';
import { errorToast } from '../../../../functions/errorToast';
import { sucessToast } from '../../../../functions/sucessToast';
import { newRequest } from '../../../../services/request';
import { getUserHours, pagination } from '../../../../services/student';
import { UserHours, PageValue } from '../../../../services/student/types';
import { filterRequestsByEixo } from '../../../../services/user';
import { UserInformation } from '../../../../services/user/types';
import { Barema } from '../Barema';
import HourCount from '../HourCount';
import { NewRequest } from '../NewRequest/NewRequestContent';
import { RequestList } from '../RequestList';
import * as S from './style';

import { Funnel, XCircle } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import moment from 'moment';

interface StudentProps {
  userInfo: UserInformation;
  router: AppRouterInstance;
}

interface FilteredRequests {
  requisicoes: Array<{
    status: string;
    id: number;
    data: string | null;
    quantidadeDeHoras: number;
  }>;
}

export const Student: React.FC<StudentProps> = ({ userInfo, router }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<UserHours>();
  const [requestsPag, setRequestsPag] = useState<PageValue>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [requestId, setRequestId] = useState<number>(0);
  const [reloadEffect, setReloadEffect] = useState<number>(0);
  const [archive, setArchive] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredRequests, setFilteredRequests] =
    useState<FilteredRequests | null>(null); // Estado para armazenar as solicitações filtradas

  const token = Cookies.get('token') || '';

  useEffect(() => {
    const userHours = async () => {
      const userHoursResponse = await getUserHours(token);
      setHours(userHoursResponse);
    };
    const requestPagination = async (page: number) => {
      const paginationResponse = await pagination({
        token,
        pag: page,
        value: 3
      });
      setRequestsPag(paginationResponse);
    };

    requestPagination(currentPage);
    setArchive(false);
    userHours();
  }, [token, currentPage, reloadEffect]);

  const fetchRequest = async () => {
    try {
      const createNewRequest = await newRequest(token);
      setRequestId(createNewRequest);
      setIsOpen(true);
      sucessToast('Rascunho criado com sucesso');
      reloadPag();
    } catch (error) {
      errorToast('Ocorreu um erro! Só é permitido possuir dois rascunhos');
      setIsOpen(false);
    }
  };

  const handleFilterClick = async (eixo: string | null) => {
    try {
      if (userInfo) {
        if (eixo === null || eixo === '') {
          // Se eixo for nulo, limpa o filtro
          setFilteredRequests(null);
        } else {
          const filteredData = await filterRequestsByEixo(
            token,
            userInfo.id,
            0,
            3,
            eixo
          );
          if (filteredData) {
            setFilteredRequests(filteredData);
          }
        }
      }
      // Verificando se userInfo não é undefined
    } catch (error) {
      console.error('Erro ao filtrar as solicitações:', error);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  function openNewRequestModal() {
    fetchRequest();
  }

  function closeNewRequestModal() {
    setIsOpen(false);
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

  const confirmationScreen = () => {
    router.push('/confirmacao-cadastro');
  };
  return (
    <S.FunctionContainer>
      {userInfo && userInfo.verificado == false ? (
        <S.VerifyDiv>
          <S.VerifyMessage>
            Para acessar as funcionalidades,
            <S.VerifyBut onClick={confirmationScreen}>
              verifique sua conta.
            </S.VerifyBut>
          </S.VerifyMessage>
        </S.VerifyDiv>
      ) : (
        <></>
      )}
      {userInfo && userInfo.verificado == false ? (
        <></>
      ) : (
        <S.Div>
          <S.Div>
            {hours ? (
              <HourCount
                gesHours={hours.horasGestao}
                extHours={hours.horasExtensao}
                pesHours={hours.horasPesquisa}
                ensHours={hours.horasEnsino}
                ensHoursWidth={hours.horasEnsinoPercentual}
                extHoursWidth={hours.horasExtensaoPercentual}
                gesHoursWidth={hours.horasGestaoPercentual}
                maxHours={hours.horasTotaisCurso}
                pesHoursWidth={hours.horasPesquisaPercentual}
              />
            ) : (
              <HourCount
                gesHours={0}
                extHours={0}
                pesHours={0}
                ensHours={0}
                ensHoursWidth="0%"
                extHoursWidth="0%"
                gesHoursWidth="0%"
                maxHours={0}
                pesHoursWidth="0%"
              />
            )}
          </S.Div>
          <S.Div>
            <S.RequestDiv>
              <S.H2Title>Solicitações em Andamento</S.H2Title>
              <S.IconButton>
                <Barema />
              </S.IconButton>
            </S.RequestDiv>
            <S.NewRequestDiv>
              <S.NewRequestButton
                label="Nova Solicitação"
                onClick={openNewRequestModal}
              />
              <S.InputRequestDiv>
                {/* <S.SearchInputContainer>
                    <S.SearchInput placeholder="Pesquisar" />
                    <S.SearchInputButton>
                      <MagnifyingGlass size={24} />
                    </S.SearchInputButton>
                  </S.SearchInputContainer>*/}

                <FilterRequests
                  isOpen={isFilterOpen}
                  onFilterClick={handleFilterClick}
                />

                <S.FilterButton>
                  <Funnel onClick={toggleFilter} size={28} weight="fill" />
                </S.FilterButton>
              </S.InputRequestDiv>
            </S.NewRequestDiv>

            <S.Div>
              <S.Div>
                {filteredRequests ? (
                  filteredRequests.requisicoes.map((item) => (
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
                    />
                  ))
                ) : requestsPag && requestsPag.totalPaginas > 0 ? (
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
                      />
                    ))}
                  </>
                ) : (
                  <S.H3Title>Nenhuma solicitação registrada...</S.H3Title>
                )}
              </S.Div>

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
                  <S.Div></S.Div>
                )}
              </S.PaginationDiv>

              <S.NewRequestModal
                closeModalArea={closeNewRequestModal}
                isOpen={isOpen}
                closeModal={closeNewRequestModal}
                // eslint-disable-next-line react/no-children-prop
                children={
                  <NewRequest
                    cancelRequest={closeNewRequestModal}
                    requestId={requestId}
                    token={token}
                    isNewRequest={true}
                  />
                }
                closeText={<XCircle size={32} color="#FF0000" />}
              ></S.NewRequestModal>
            </S.Div>
          </S.Div>
        </S.Div>
      )}
    </S.FunctionContainer>
  );
};
