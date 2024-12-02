import Button from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';

import styled from 'styled-components';
interface CertificateSelectProps {
  selected: boolean;
}

export const Container = styled.div`
  padding-top: 1rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 16rem;
  min-width: 11.5rem;
  overflow-y: auto;
  background-color: #d9d9d9;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleDiv = styled.div`
  margin: 0rem 0.5rem 0rem 0.5rem;
`;

export const Title = styled.p`
  color: #253555;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid #253555;
  width: 100%;
`;
export const ListDiv = styled.div``;

export const Div = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CertificateSelect = styled.div<CertificateSelectProps>`
  background-color: ${(props) => (props.selected ? '#e74c3c' : '#253555')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
  margin: 0.8em;
  width: 90%;
  cursor: pointer;
`;
export const Label = styled.p`
  color: #fff;
`;

export const Label2 = styled.p``;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Printer = styled(Button)`
  background: #476aad;
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
  margin: 0.8em;
  width: 90%;
`;

export const Accept = styled(Button)`
  background: #5ebc4f;
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
  width: 90%;
  margin: 0.8em;
`;

export const Decline = styled(Button)`
  background: #b21313;
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
  width: 90%;
  margin: 0.8em;
`;

export const Sender = styled(Button)`
  background: #476aad;
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
  width: 90%;
  margin: 0.8em;
`;

export const Back = styled(Button)`
  background: #f5f5f5;
  color: #1c3c78;
  padding: 0.8em;
  border-radius: 20px;
  font-size: 0.7em;
  width: 90%;
  margin: 0.8em;
`;

export const ModalContainer = styled(Modal)`
  border-radius: 15px;
  overflow: auto;
  width: fit-content;
  padding-top: 15px;
  padding-right: 4rem;
  padding-left: 4rem;
  justify-content: center;
  display: flex;
  background-color: #e4e4e4;
  border: #253555 1px solid;
  @media (max-width: 426px) {
    width: 70%;
  }
`;

export const ModalContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;
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

export const ModalTitle = styled.label`
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;
