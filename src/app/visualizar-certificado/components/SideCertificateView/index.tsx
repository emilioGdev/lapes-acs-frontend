import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { errorToast } from '../../../../functions/errorToast';
import { sucessToast } from '../../../../functions/sucessToast';
import { warnToast } from '../../../../functions/warnToast';
import { evaluateRequest } from '../../../../services/commission';
import { Certificate } from '../../../../services/request/types';
import Downloadcertificado from '../../../registrar-certificado/PDFViewer/Downloadcertificado';
import * as S from './styles';

import {
  CheckFat,
  PaperPlaneTilt,
  Printer,
  Prohibit,
  XCircle
} from '@phosphor-icons/react';
import Cookies from 'js-cookie';

interface SideViewInterface {
  certificate: Array<Certificate> | undefined;
  onCertificateClick: (id: number) => void;
  dowloadPfd: number;
  onChangeStatus?: (string) => void;
  isAllCertificateDid?: boolean;
  requestId?: number;
}

export const SideCertificateView = ({
  certificate,
  onCertificateClick,
  dowloadPfd,
  onChangeStatus,
  isAllCertificateDid,
  requestId
}: SideViewInterface) => {
  const router = useRouter();
  const token = Cookies.get('token') || '';
  const [certificates, setCertificates] = useState<Array<Certificate>>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [observacion, setObservacion] = useState<string>();

  useEffect(() => {
    if (certificate !== undefined) {
      setCertificates(certificate);
    }
  }, [certificate, certificates]);

  const backHomeScreen = () => {
    router.push(`/home`);
  };

  const handleCertificateSelect = (id: number | undefined) => {
    if (id !== undefined) {
      setSelectedCertificate(id);
      onCertificateClick(id);
    }
  };

  const handleDownloadClick = () => {
    // Call the downloadPDF function with the desired PDF ID
    Downloadcertificado(dowloadPfd); // Replace 123 with the actual PDF ID
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalArea = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChangeObservation = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setObservacion(value);
  };

  const [isReadyToSent, setIsReadyToSent] = useState(false);
  const [errorObservation, setErrorObservation] = useState<boolean>(false);

  const ChangeStatus = (status) => {
    const evaluate = async () => {
      try {
        await evaluateRequest(token, requestId, status, observacion);
        sucessToast('Certificado avaliado com sucesso!');
        router.push('/home');
      } catch (error) {
        if (
          (error as { mensagem: string }).mensagem ===
          'Os dados a seguir /email já estão cadastrados!'
        ) {
          warnToast(`${(error as { mensagem: string }).mensagem}`);
        } else {
          errorToast('Houve algum erro ao tentar se cadastrar!');
          console.log(error);
        }
      }
    };
    evaluate();
  };

  return (
    <S.Container>
      <S.Content>
        <S.TitleDiv>
          <S.Title>Anexados:</S.Title>
          <S.Line />
        </S.TitleDiv>
        <S.Div>
          <S.ListDiv>
            {certificates &&
              certificates.map((certificado, index) => {
                if (certificado.id !== undefined) {
                  return (
                    <S.CertificateSelect
                      key={index}
                      onClick={() => handleCertificateSelect(certificado.id)}
                      selected={selectedCertificate === certificado.id}
                    >
                      <S.Label>{`Certificado ${certificado.id}`}</S.Label>
                    </S.CertificateSelect>
                  );
                }
              })}
          </S.ListDiv>
          <S.ButtonDiv>
            {certificates.find((cert) => cert.id === selectedCertificate)
              ?.statusCertificado === 'ENCAMINHADO_COMISSAO' && (
              <>
                <S.Accept
                  label="Aceitar"
                  startAdornment={<CheckFat size={20} weight="fill" />}
                  onClick={() => onChangeStatus('CONCLUIDO')}
                />
                <S.Decline
                  label="Recusar"
                  startAdornment={<Prohibit size={20} weight="bold" />}
                  onClick={() => onChangeStatus('PROBLEMA')}
                />
              </>
            )}
            {isAllCertificateDid == true && (
              <S.Sender
                label="Enviar solicitação"
                startAdornment={<PaperPlaneTilt size={20} />}
                onClick={openModal}
              />
            )}
            <S.Printer
              label="Imprimir Solicitacao"
              startAdornment={<Printer size={20} />}
              onClick={handleDownloadClick}
            />
            <S.Back label="Voltar" onClick={backHomeScreen} />
          </S.ButtonDiv>
        </S.Div>
        <S.ModalContainer
          isOpen={isOpen}
          closeModalArea={closeModalArea}
          closeModal={closeModal}
          // eslint-disable-next-line react/no-children-prop
          children={
            <S.ModalContent>
              <S.ModalTitle>Concluir solicitação</S.ModalTitle>
              <S.InputLines>
                <S.InputGroup>
                  <S.Label2>Observação:</S.Label2>
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
              </S.InputLines>
              <S.InputLines>
                <S.Accept
                  label="Aceitar"
                  startAdornment={<CheckFat size={20} weight="fill" />}
                  onClick={() => ChangeStatus('ACEITO')}
                />
                <S.Decline
                  label="Recusar"
                  startAdornment={<Prohibit size={20} weight="bold" />}
                  onClick={() => ChangeStatus('NEGADO')}
                />
              </S.InputLines>
            </S.ModalContent>
          }
          closeText={<XCircle size={30} color="#FF0000" />}
        ></S.ModalContainer>
      </S.Content>
    </S.Container>
  );
};
