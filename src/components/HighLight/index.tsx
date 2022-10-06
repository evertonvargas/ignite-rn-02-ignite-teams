import * as S from "./styles";

interface HighLightProps {
  title: string;
  subtitle: string;
}

export function HighLight({ title, subtitle }: HighLightProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subtitle}</S.SubTitle>
    </S.Container>
  );
}
