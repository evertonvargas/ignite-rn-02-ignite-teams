import { useNavigation } from "@react-navigation/native";
import LogoImg from "@assets/logo.png";
import * as S from "./styles";

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate("groups");
  }

  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={handleGoBack}>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={LogoImg} />
    </S.Container>
  );
}
