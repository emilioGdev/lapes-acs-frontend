'use client';

import React, { useEffect, useState } from 'react';

import { sumRequestHours } from '../../../app/home/functions/sumRequestHours';
import { sucessToast } from '../../../functions/sucessToast';
import { CommissionList, sendToTeacher } from '../../../services/coordinator';
import { Commission } from '../../../services/coordinator/types';
import { downloadPDF } from '../../../services/request';
import { CertificateList } from '../../CertificateList';
import { Pagination } from '../../Pagination';
import { ViewRequestProps, StatusCheckInterface } from './interface/types';
import * as S from './styles';

import { Printer } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import moment from 'moment';

export default function ViewRequestContent(props: ViewRequestProps) {
  const iconSize = 24;
  const {
    id,
    dataDeSubmissao,
    requisicaoStatus,
    observacao,
    certificados,
    typeUser
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [commissionList, setCommissionList] = useState<Array<Commission>>([]);
  const [teacher, setTeacher] = useState<string>('');
  const [errorTeacher, setErrorTeacher] = useState<boolean>(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const statusCheckObject: StatusCheckInterface = {
    ACEITO: 'Aceito',
    TRANSITO: 'Em análise',
    NEGADO: 'Indeferido'
  };

  const statusDescription =
    statusCheckObject[requisicaoStatus || 'defaultStatus'];

  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const certificates = !certificados ? [] : certificados;
  const displayedItems = certificates.slice(startIndex, endIndex);
  const token = Cookies.get('token') || '';

  const handleDownloadPDF = async () => {
    try {
      if (id) {
        const response = await downloadPDF(token, id);
        if (response) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = `documento.pdf`;
          link.click();

          URL.revokeObjectURL(url);
        } else {
          console.error('Erro ao baixar o PDF');
        }
      }
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
    }
  };

  useEffect(() => {
    if (typeUser == 'COORDENADOR') {
      const commission = async () => {
        const response = await CommissionList(token);
        setCommissionList(response);
      };
      commission();
    }
  }, [token, typeUser]);

  const sendToSelectTeacher = async () => {
    if (errorTeacher == true) {
      await sendToTeacher(token, parseInt(teacher), id);
      sucessToast('Requisição enviada ao professor(a)');
    }
  };

  const checkTeacher = (type: string): boolean => {
    if (type === '') {
      return false;
    }
    return true;
  };

  const handleChangeTeacher = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setTeacher(value);
    setErrorTeacher(checkTeacher(value));
  };

  return (
    <div>
      <S.Container>
        <S.RequestTitle>Solicitação {id}</S.RequestTitle>
        <S.Division />
        <S.CenterContent>
          <S.GridContainer>
            <S.Content>
              <S.Description>Status: </S.Description>
              <S.Status>
                <S.StatusCircle status={statusDescription}></S.StatusCircle>
                {statusDescription}
              </S.Status>
            </S.Content>
            <S.Content>
              <S.Description>Data da Solicitação:</S.Description>

              <S.RequestDate>
                {moment(dataDeSubmissao).format('DD/MM/YYYY')}
              </S.RequestDate>
            </S.Content>

            <S.Content>
              <S.Description>Quantidade de horas:</S.Description>
              <S.RowAligner>
                <S.HoursAmount>
                  {certificados !== undefined
                    ? sumRequestHours(certificados)
                    : null}
                </S.HoursAmount>
                <S.HoursName>hora(s)</S.HoursName>
              </S.RowAligner>
            </S.Content>
          </S.GridContainer>
        </S.CenterContent>
        <S.Description>Observações do Coordenador:</S.Description>
        <S.CoordObservation>
          {observacao === null ? 'Sem observações na solicitação' : observacao}
        </S.CoordObservation>
        {typeUser == 'COORDENADOR' && (
          <S.ChooseTeacher>
            <S.ComponentsContainer>
              <S.Description>Escolher Professor:</S.Description>
              <S.RegisterSelect onChange={handleChangeTeacher}>
                <S.SelectOption value="">Professores</S.SelectOption>
                {commissionList.map((item) => (
                  <S.SelectOption value={item.id} key={item.id}>
                    {item.nomeCompleto}
                  </S.SelectOption>
                ))}
              </S.RegisterSelect>
              {!errorTeacher && (
                <S.ErroMessage>*Selecione um professor</S.ErroMessage>
              )}
            </S.ComponentsContainer>
            <S.Sender label="Enviar" onClick={sendToSelectTeacher} />
          </S.ChooseTeacher>
        )}
        <S.CertificateTitle>Certificados:</S.CertificateTitle>
        <S.Division />
        {displayedItems.map((certificado) => (
          <CertificateList
            key={certificado.id}
            eixoAtividade={certificado.eixoAtividade}
            statusCertificado={certificado.statusCertificado}
            atividade={certificado.atividade}
            hours={certificado.cargaHoraria}
            requestId={id}
            certificateId={certificado.id}
            titulo={certificado.titulo}
          />
        ))}
        <Pagination
          onPageChange={handlePageChange}
          totalCount={certificates.length}
          currentPage={currentPage}
          pageSize={pageSize}
        />
        <S.PrintIcon onClick={handleDownloadPDF}>
          <Printer size={iconSize} />
        </S.PrintIcon>
      </S.Container>
    </div>
  );
}
