import { ButtonIcon } from "@components/ButtonIcon";
import * as S from "./styles";

interface PlayCardProps {
  name: string;
  onRemove: () => void;
}

export function PlayCard({ name, onRemove }: PlayCardProps) {
  return (
    <S.Container>
      <S.Icon name="person" />
      <S.Name>{name}</S.Name>
      <ButtonIcon nameIcon="close" type="SECONDARY" onPress={onRemove} />
    </S.Container>
  );
}
