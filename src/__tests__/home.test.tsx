import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation'; // Importação do useRouter para mock

import Home from '../app/page';
import { getUserInformation } from '../services/user';
import { getUserHours } from '../services/userHours';

import { render, screen, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('../services/userHours', () => ({
  getUserHours: jest.fn()
}));

jest.mock('../services/user', () => ({
  getUserInformation: jest.fn()
}));

describe('Home Page', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn()
    });

    (getUserHours as jest.Mock).mockResolvedValue({
      horasGestao: 10,
      horasExtensao: 5,
      horasPesquisa: 15,
      horasEnsino: 20,
      horasTotaisCurso: 40,
      horasGestaoPercentual: '25%',
      horasExtensaoPercentual: '12.5%',
      horasPesquisaPercentual: '37.5%',
      horasEnsinoPercentual: '50%'
    });

    (getUserInformation as jest.Mock).mockResolvedValue({
      id: 1,
      nomeCompleto: 'jamuelton',
      verificado: true
    });
  });

  it('remderizar página e informações do usuário', async () => {
    render(<Home />);

    screen.debug();

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Bem vindo(a), jamuelton');
    });

    // expect(screen.getByText('Solicitações em Andamento')).toBeInTheDocument();
  });
});
