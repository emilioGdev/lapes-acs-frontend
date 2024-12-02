import { useEffect, useState } from 'react';

import { certificateData } from '../../../../services/certificate';
import { getCertificateInterface } from '../../../../services/certificate/types';
import { DataText } from './components/DataText';
import * as S from './styles';

//import { DownloadSimple } from '@phosphor-icons/react';
import moment from 'moment';

interface CertificateViewInterface {
  token: string;
  id: number;
  requestId: number;
  userPerfil: string;
  onObservationChange?: (string) => void;
  onHoursChange?: (string) => void;
}

export const CertificateView = ({
  token,
  id,
  requestId,
  userPerfil,
  onHoursChange,
  onObservationChange
}: CertificateViewInterface) => {
  const [certificate, setCertificate] = useState<getCertificateInterface>();

  const [observacion, setObservacion] = useState<string>();
  const [hours, setHours] = useState<string>();
  const [isReadyToSent, setIsReadyToSent] = useState(false);
  const [errorObservation, setErrorObservation] = useState<boolean>(false);
  const [errorHours, setErrorHours] = useState<boolean>(false);

  useEffect(() => {
    const certificateFetch = async () => {
      try {
        const certificateResponse = await certificateData({
          id: id,
          token: token
        });
        setCertificate(certificateResponse);
      } catch (error) {
        console.error('error', error);
      }
    };
    certificateFetch();
  }, [id, token]);

  const handleChangeObservation = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setObservacion(value);
    onObservationChange(value);
  };

  const handleChangeHours = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setHours(value);
    onHoursChange(value);
  };

  return (
    <S.Container>
      <S.RequestDiv>
        <S.RequestId>
          Visualização Detalhada da Solicitação: Id- {requestId}
        </S.RequestId>
      </S.RequestDiv>
      {certificate && (
        <S.DataDiv>
          <S.DataRow>
            <DataText title={'Titulo:'} content={certificate.titulo} />
            <DataText
              title={'Data inicial:'}
              content={moment(certificate.dataInicial, 'YYYY-MM-DD').format(
                'DD/MM/YYYY'
              )}
            />
            <DataText
              title={'Data final:'}
              content={moment(certificate.dataFinal, 'YYYY-MM-DD').format(
                'DD/MM/YYYY'
              )}
            />
          </S.DataRow>
          <S.DataRow>
            <DataText
              title={'Eixo de ensino:'}
              content={
                certificate.eixoAtividade.charAt(0).toUpperCase() +
                certificate.eixoAtividade.slice(1).toLowerCase()
              }
            />
            <DataText
              title={'Quantidade de horas:'}
              content={`${certificate.cargaHoraria} hora(s)`}
            />
          </S.DataRow>

          <S.DataRow>
            <DataText title={'Atividade:'} content={certificate.atividade} />
          </S.DataRow>
        </S.DataDiv>
      )}
      {userPerfil &&
        userPerfil == 'COMISSAO' &&
        (certificate &&
        certificate.statusCertificado == 'ENCAMINHADO_COMISSAO' ? (
          <S.InputLines>
            <S.InputGroup>
              <S.Label>Observação:</S.Label>
              <S.Input
                type="text"
                onChange={handleChangeObservation}
                value={observacion}
                disabled={isReadyToSent}
                required
              />
              {errorObservation ? (
                <S.ErrorSpan>*Entrada inválida</S.ErrorSpan>
              ) : (
                <></>
              )}
            </S.InputGroup>
            <S.InputGroup>
              <S.Label>Horas:</S.Label>
              <S.Input
                type="text"
                onChange={handleChangeHours}
                value={hours}
                disabled={isReadyToSent}
                required
              />
              {errorHours ? (
                <S.ErrorSpan>*Entrada inválida</S.ErrorSpan>
              ) : (
                <></>
              )}
            </S.InputGroup>
          </S.InputLines>
        ) : (
          <>Já foi avaliado</>
        ))}
      {/*
      <S.ButtonDiv>
        <S.DownloadCertificate
          label="Salvar certificado"
          startAdornment={<DownloadSimple size={24} />}
        />
         <S.ViewCertificate
          label="Visualizar Certificado"
          startAdornment={<File size={24} />}
        /> 
      </S.ButtonDiv>*/}
    </S.Container>
  );
};
