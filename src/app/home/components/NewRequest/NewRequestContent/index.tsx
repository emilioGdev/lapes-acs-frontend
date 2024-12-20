'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { errorToast } from '../../../../../functions/errorToast';
import { sucessToast } from '../../../../../functions/sucessToast';
import { warnToast } from '../../../../../functions/warnToast';
import {
  newCertificate,
  deleteCertificate
} from '../../../../../services/certificate';
import { getRequest } from '../../../../../services/request';
import { Certificate } from '../../../../../services/request/types';
import * as S from './style';

import { XCircle, FilePlus } from '@phosphor-icons/react';

type ComponentProps = {
  cancelRequest: () => void;
  requestId: number | undefined;
  token: string;
  isNewRequest: boolean;
};

export const NewRequest = ({
  cancelRequest,
  requestId,
  token,
  isNewRequest
}: ComponentProps) => {
  const [certificateData, setCertificateData] = useState<Certificate[]>([]);
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [certifacatesId, setCertificatesId] = useState<number[]>([]);
  const [isCertificateLoading, setIsCertificateLoading] = useState(false);

  const request = useCallback(async () => {
    try {
      const requestResponse = await getRequest(requestId, token);
      setCertificateData(requestResponse.certificados ?? []);
    } catch (error) {
      errorToast('Ocorreu um erro! Tente novamente mais tarde');
    }
  }, [requestId, token]);

  useEffect(() => {
    if (!isNewRequest) {
      request();
    }
  }, [isNewRequest, request, requestId, token]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileRegex = /^.+\.pdf$/;
    const mb = 1048576; //1mb

    const files = event.target.files;
    if (files != null && files.length < 2) {
      if (fileRegex.test(files[0].name)) {
        if (files[0].size < mb) {
          if (requestId != undefined) {
            try {
              setIsCertificateLoading(true);
              setUploadedFiles((prevFiles) => [...prevFiles, files[0]]);
              const addCertificate = await newCertificate(
                token,
                requestId,
                files[0]
              );
              setCertificatesId((prevFiles) => [...prevFiles, addCertificate]);
              setIsCertificateLoading(false);
            } catch (error) {
              setIsCertificateLoading(false);
              setUploadedFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                updatedFiles.pop();
                return updatedFiles;
              });
              warnToast(`${(error as { mensagem: string }).mensagem}`);
            }
          }
        } else {
          errorToast('Só é possível enviar arquivos com menos de 1mb');
        }
      } else {
        errorToast('Só é possível enviar PDF');
      }
    } else {
      warnToast('Só é possível enviar um arquivo por vez');
    }
  };

  const handleRemoveFile = async (index: number) => {
    await deleteCertificate(certifacatesId[index], token);
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleDeleteCertificate = async (certificateId: number | undefined) => {
    try {
      if (certificateId != undefined) {
        await deleteCertificate(certificateId, token);
        sucessToast('Certificado deletado com sucesso!');
        request();
      }
    } catch (error) {
      errorToast('Ocorreu um erro ao deletar o certificado!');
    }
  };

  const handleNext = () => {
    if (uploadedFiles.length > 0 || certificateData.length > 0) {
      if (requestId != undefined) {
        router.push(`/registrar-certificado/${requestId}`);
      }
    } else {
      errorToast('Insira um arquivo!');
    }
  };

  // const fetchCertificate = async (userToken: string, id: number) => {
  //   // for (let index = 0; index < uploadedFiles.length; index++) {
  //   //   try {
  //   //     const addCertificate = await newCertificate(
  //   //       userToken,
  //   //       id,
  //   //       uploadedFiles[index]
  //   //     );
  //   //     certifacatesId.push(addCertificate);
  //   //   } catch (error) {
  //   //     if (error.mensagem === 'Essa certificado já foi cadastrado!') {
  //   //       errorToast(`${uploadedFiles[index].name}`);
  //   //       setUploadedFiles((prevFiles) => {
  //   //         const updatedFiles = [...prevFiles];
  //   //         updatedFiles.splice(index, 1);
  //   //         return updatedFiles;
  //   //       });
  //   //     }
  //   //     throw error;
  //   //   }
  //   // }
  // };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    const fileRegex = /^.+\.pdf$/;
    const maxFileSize = 1048576;

    if (files != null && files.length < 2) {
      if (fileRegex.test(files[0].name)) {
        if (files[0].size < maxFileSize) {
          if (requestId != undefined) {
            try {
              setIsCertificateLoading(true);
              setUploadedFiles((prevFiles) => [...prevFiles, files[0]]);
              const addCertificate = await newCertificate(
                token,
                requestId,
                files[0]
              );
              setCertificatesId((prevFiles) => [...prevFiles, addCertificate]);
              setIsCertificateLoading(false);
            } catch (error) {
              setIsCertificateLoading(false);
              setUploadedFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                updatedFiles.pop();
                return updatedFiles;
              });
              warnToast(`${(error as { mensagem: string }).mensagem}`);
            }
          }
        } else {
          errorToast('Só é possível enviar arquivos com menos de 1mb');
        }
      } else {
        errorToast('Só é possível enviar PDF');
      }
    } else {
      warnToast('Só é possível enviar um arquivo por vez');
    }
  };

  return (
    <S.Container onDragOver={handleDragOver} onDrop={handleDrop}>
      <S.Title>Etapa 1 de 3 - Anexar certificados</S.Title>
      <S.FileInputContainer>
        <S.FileInputLabel htmlFor="selecao-arquivo">
          Arraste aqui o(s) arquivo(s) desejado(s)
          <FilePlus size={41} color="#4A4747" />
        </S.FileInputLabel>
        <S.FileInput
          id="selecao-arquivo"
          type="file"
          onChange={handleFileUpload}
          value={''}
          multiple
        />
      </S.FileInputContainer>
      <S.FileListContainer>
        <S.FileList>
          {certificateData.map((certificate) => (
            <S.FileItem key={certificate.id}>
              <S.FileName>{`Certificado ${certificate.id}.pdf`}</S.FileName>
              <S.FileRemoveButton>
                <XCircle
                  color="#FF0000"
                  size={20}
                  onClick={() => handleDeleteCertificate(certificate.id)}
                />
              </S.FileRemoveButton>
            </S.FileItem>
          ))}
          {uploadedFiles.map((file, index) => (
            <S.FileItem key={index}>
              <S.FileName>{file.name}</S.FileName>
              <S.FileRemoveButton onClick={() => handleRemoveFile(index)}>
                <XCircle color="#FF0000" size={20} />
              </S.FileRemoveButton>
            </S.FileItem>
          ))}
        </S.FileList>
      </S.FileListContainer>
      <S.SizeWarning>
        Somente arquivos em formato PDFs são aceitos. Limite de tamanho: 1MB.
      </S.SizeWarning>
      {!isCertificateLoading ? (
        <S.ButtonsContainer>
          <S.CancelButton onClick={cancelRequest}>Cancelar</S.CancelButton>
          <S.NextButton onClick={handleNext}>Próximo</S.NextButton>
        </S.ButtonsContainer>
      ) : (
        <S.ButtonsContainer>
          <S.LoadingDiv>Carregando...</S.LoadingDiv>
        </S.ButtonsContainer>
      )}
    </S.Container>
  );
};
