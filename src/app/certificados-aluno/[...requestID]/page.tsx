'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCertificateInterface } from '../../../services/certificate/types';
import { certificateStudent } from '../../../services/commission';
import PDFViewer from '../../registrar-certificado/PDFViewer/PDFViewer';
import * as S from './styles';

import Cookies from 'js-cookie';

interface idProps {
  params: { requestID: string };
}

export default function CertificadosAluno({ params }: idProps) {
  const router = useRouter();
  const token = Cookies.get('token') || '';
  const [certificates, setCertificates] =
    useState<Array<getCertificateInterface>>();
  function backHome() {
    router.push('/home');
  }

  useEffect(() => {
    const getAllStudentCetificate = async () => {
      const certificateRequest = {
        token: token,
        id: params.requestID[0]
      };
      const response = await certificateStudent(certificateRequest);
      setCertificates(response);
    };

    getAllStudentCetificate();
  }, [params.requestID, token]);

  return (
    <S.Container>
      <S.Content>
        <S.TitleDiv>
          <S.Title>Requisições do aluno</S.Title>
          <S.Line />
        </S.TitleDiv>
        <S.FilterDiv>
          <S.BackDiv>
            <S.BackButton label="Voltar" onClick={backHome} />
          </S.BackDiv>
        </S.FilterDiv>
        {certificates && certificates.length > 0 ? (
          certificates.map((item, key) => (
            <S.PDFDiv key={key}>
              <PDFViewer pdfId={item.id} />
            </S.PDFDiv>
          ))
        ) : (
          <p>Sem certificados aprovados ainda...</p>
        )}
      </S.Content>
    </S.Container>
  );
}
