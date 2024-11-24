'use client';

import { useEffect, useState } from 'react';

import { evaluateCertificate } from '../../../services/commission';
import { getRequest } from '../../../services/request';
import { UserRequest } from '../../../services/request/types';
import { getUserInformation } from '../../../services/user';
import { UserInformation } from '../../../services/user/types';
import PDFViewer from '../../registrar-certificado/PDFViewer/PDFViewer';
import { CertificateView } from '../components/CertificateView';
import { SideCertificateView } from '../components/SideCertificateView';
import * as S from './styles';

import Cookies from 'js-cookie';

interface idProps {
  params: { requestID: string; certificateId: string };
}

export default function VisualizarCertificado({ params }: idProps) {
  const token = Cookies.get('token') || '';
  const [selectId, setSelectId] = useState<UserRequest>();
  const [requestIdSelect, setRequestIdSelect] = useState<number>();
  const [certificateId, setCertificateId] = useState<number>(
    parseInt(params.requestID[1])
  );
  const [userInfo, setUserInfo] = useState<UserInformation>();
  const [observacion, setObservacion] = useState<string>();
  const [hours, setHours] = useState<string>();

  useEffect(() => {
    setRequestIdSelect(parseInt(params.requestID));
    const requestIdFetch = async () => {
      const requestResponse = await getRequest(
        parseInt(params.requestID),
        token
      );
      setSelectId(requestResponse);
    };
    const userInfo = async () => {
      const userResponse = await getUserInformation(token);
      setUserInfo(userResponse);
    };
    userInfo();
    requestIdFetch();
  }, [params, requestIdSelect, setSelectId, token]);

  const handleCertificateClick = (id: number) => {
    setCertificateId(id);
  };

  const handleChangeObservation = (value) => {
    setObservacion(value);
  };

  const handleChangeHours = (value) => {
    setHours(value);
  };

  const handleChangeStatus = (status) => {
    const evaluate = async () => {
      console.log('token ' + token);
      console.log('id do certificado ' + certificateId);
      console.log('status ' + status);
      console.log('observacao ' + observacion);
      console.log('horas ' + hours);
      const response = await evaluateCertificate(
        token,
        certificateId,
        status,
        observacion,
        parseInt(hours)
      );
      console.log(response);
    };
    evaluate();
  };

  return (
    <S.Container>
      <S.ContentDiv>
        <S.PrincipalDiv>
          {requestIdSelect && (
            <CertificateView
              token={token}
              id={certificateId}
              requestId={requestIdSelect}
              userPerfil={userInfo && userInfo.perfis[0]}
              onObservationChange={handleChangeObservation}
              onHoursChange={handleChangeHours}
            />
          )}
          <S.PDFDiv>
            <PDFViewer pdfId={certificateId} />
          </S.PDFDiv>
        </S.PrincipalDiv>
        {selectId && (
          <SideCertificateView
            certificate={selectId.certificados}
            onCertificateClick={handleCertificateClick}
            dowloadPfd={certificateId}
            onChangeStatus={handleChangeStatus}
          />
        )}
      </S.ContentDiv>
    </S.Container>
  );
}
