'use client';

import { useState } from 'react';

import { RequestList } from '../RequestList';
import * as S from './styles';

import moment from 'moment';

export const Comission = () => {
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
  );
};
