'use client';

import { useState } from 'react';

import { RequestList } from '../home/components/RequestList';
import * as S from './style';

import { ArrowCircleLeft, ArrowCircleRight } from '@phosphor-icons/react';
import moment from 'moment';

export default function Escolaridade() {
  const buttonData = [
    { grade: 'ES 19.1' },
    { grade: 'ES 20.1' },
    { grade: 'ES 21.1' },
    { grade: 'ES 22.1' },
    { grade: 'ES 23.1' },
    { grade: 'ES 24.1' }
  ];

  const totalTasks = 100;
  const [completedTasks, setCompletedTasks] = useState<number>(40);
  const [reloadEffect, setReloadEffect] = useState<number>(0);

  const percentage = (completedTasks / totalTasks) * 100;

  const Requests = {
    requisicoes: [
      {
        status: 'TRANSITO',
        id: 1,
        data: '2024-11-16T12:00:00Z',
        quantidadeDeHoras: 5
      }
    ]
  };

  function reloadPag() {
    setReloadEffect((prev) => prev + 1);
  }

  return (
    <S.Container>
      <S.ContentDiv>
        <S.TitleDiv>
          <S.UserName>{`Bem vindo(a) Vitor`}</S.UserName>
          <S.Line />
        </S.TitleDiv>
        <S.FunctionContainer>
          <S.TurmasArea>
            <S.H2Title>Turmas</S.H2Title>
            <S.TurmaSelect>
              <ArrowCircleLeft size={32} />
              {buttonData.map((data, key) => (
                <button key={key}>{data.grade}</button>
              ))}
              <ArrowCircleRight size={32} />
            </S.TurmaSelect>
          </S.TurmasArea>
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
            {Requests.requisicoes.map((item) => (
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
                token={''}
                isDraft={false}
                reloadRequestDelete={reloadPag}
                reloadRequestArchive={reloadPag}
                type={false}
              />
            ))}
          </S.RequisicoesArea>
        </S.FunctionContainer>
      </S.ContentDiv>
    </S.Container>
  );
}
