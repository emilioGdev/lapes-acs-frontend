'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getArchived } from '../../services/request';
import { UserRequest } from '../../services/request/types';
import { RequestList } from '../home/components/RequestList';
import * as S from './styles';

import { Funnel } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import moment from 'moment';

export default function SolicitacoesArquivadas() {
  const [requestList, setRequestList] = useState<Array<UserRequest>>([]);
  const [filteredRequestList, setFilteredRequestList] = useState<
    Array<UserRequest>
  >([]);
  const [reloadEffect, setReloadEffect] = useState<number>(0);
  const [archive, setArchive] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const token = Cookies.get('token') || '';

  useEffect(() => {
    const archiveRequest = async () => {
      const requestResponse = await getArchived(token);
      setRequestList(requestResponse);
      setFilteredRequestList(requestResponse);
    };
    setArchive(true);
    archiveRequest();
  }, [token, reloadEffect]);

  function backHome() {
    router.push('/home');
  }

  function reloadPag() {
    setReloadEffect((prev) => prev + 1);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredRequests = requestList.filter(
      (item) =>
        item.id.toString().includes(value) ||
        item.requisicaoStatus.toLowerCase().includes(value)
    );

    console.log(filteredRequests);

    setFilteredRequestList(filteredRequests);
  }

  console.log(requestList);

  return (
    <S.Container>
      <S.Content>
        <S.TitleDiv>
          <S.Title>Solicitações Arquivadas</S.Title>
          <S.Line />
        </S.TitleDiv>
        <S.FilterDiv>
          <S.InputRequestDiv>
            <S.RegisterInput
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <S.IconButton>
              <Funnel size={28} weight="fill" />
            </S.IconButton>
          </S.InputRequestDiv>
          <S.BackDiv>
            <S.BackButton label="Voltar" onClick={backHome} />
          </S.BackDiv>
        </S.FilterDiv>
        <S.RequestDiv>
          {filteredRequestList.length > 0 ? (
            filteredRequestList.map((item) => (
              <RequestList
                status={item.requisicaoStatus}
                id={item.id}
                initialDate={moment(item.dataDeSubmissao).format('DD/MM/YYYY')}
                hours={item.quantidadeDeHoras}
                key={item.id}
                token={token}
                isDraft={true}
                reloadRequestDelete={function (): void {
                  throw new Error('Function not implemented.');
                }}
                reloadRequestArchive={reloadPag}
                type={archive}
              />
            ))
          ) : (
            <p>Não existe nenhuma solicitação arquivada.</p>
          )}
        </S.RequestDiv>
      </S.Content>
    </S.Container>
  );
}
