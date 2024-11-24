import styled from 'styled-components';

interface TotalBarProps {
  width: string;
  color: string;
  radius: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 83.5dvh;
  background: #f1efef;

  @media screen and (max-width: 767px) {
    height: max-content;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: max-content;
  }
`;

export const ContentDiv = styled.div`
  width: 90%;
  margin-left: 100px;
  padding-bottom: 8px;

  @media screen and (max-width: 767px) {
    width: 100vw;
    margin: 0;
  }
`;

export const UserName = styled.h1``;

export const TitleDiv = styled.div`
  width: 100%;
  color: #b21313;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid #b21313;
  width: 100%;
`;

export const H2Title = styled.h2`
  font-size: 2em;
  color: #b21313;
  @media screen and (max-width: 767px) {
    font-size: 1em;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

export const H3Title = styled.h3``;

export const FunctionContainer = styled.div`
  background: #f3f3f3;
  padding: 16px;
  border-radius: 12px;
  max-width: 95%;
  margin: 0 auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const TurmasArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

export const TurmaSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    background-color: #22385e;
    color: #ffffff;
    padding: 0.5rem 2rem;
    border-radius: 8px;
  }
`;

export const ContadorArea = styled.div`
  background-color: #d9d9d9;
  padding: 0.5rem;
  border-radius: 3rem;
`;

export const ContadorLabel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  label {
    font-size: 0.725rem;
  }
`;

export const Contador = styled.div<TotalBarProps>`
  width: ${(props) => props.width};
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.radius};
  transition: width 0.3s ease;
`;

export const ControladorArea = styled.div``;

export const RequisicoesArea = styled.div``;

export const PaginationDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
