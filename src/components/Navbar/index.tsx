'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import * as S from './styles';

import { User } from '@phosphor-icons/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  if (pathName === '/registrar' || pathName === '/') return null;

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <S.Container>
      <S.LogoLapes>
        <S.LogoTitle>
          LAPES <S.LogoSpan>ACEs</S.LogoSpan>
        </S.LogoTitle>
        <S.LogoTypeUser>Discente</S.LogoTypeUser>
      </S.LogoLapes>
      <S.Menu>
        <S.Link href="/home">Home</S.Link>
        <S.Link href="/solicitacoes-arquivadas">Arquivadas</S.Link>
        <S.Link href="/duvidas-frequentes">ajuda</S.Link>
        <S.MenuPerfil onClick={toggleDropdown}>
          <User />
          <S.Dropdown isOpen={isOpen}>
            <S.DropdownItem href="/perfil-usuario">Perfil</S.DropdownItem>
            <S.DropdownItem href="/teste2">sair</S.DropdownItem>
          </S.Dropdown>
        </S.MenuPerfil>
      </S.Menu>
    </S.Container>
  );
}
