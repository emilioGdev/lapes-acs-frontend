import Button from '../../../../components/Button';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DataRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0px 8px 0px;
`;

export const DataDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const RequestDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const RequestId = styled.p`
  color: #1c3c78;
  font-size: 1rem;
`;

export const ButtonDiv = styled.div`
  width: 50%;
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
`;

export const DownloadCertificate = styled(Button)`
  background: #283d69;
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
`;

export const ViewCertificate = styled(Button)`
  background: #b9b9b9;
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;
`;

export const Label = styled.label`
  font-size: 18px;
  margin-bottom: 4px;
  color: #253555;
`;

export const Input = styled.input`
  height: 2rem;
  width: 20rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 4px;
  background-color: #d9d9d9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const ErrorSpan = styled.span`
  color: red;
  font-size: 10px;
  margin-top: 6px;
  margin-left: 5px;
`;

export const InputLines = styled.div`
  display: flex;
`;
