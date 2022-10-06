import * as S from "./styles";

import LogoImg from "@assets/logo.png";

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={LogoImg} />
    </S.Container>
  );
}
