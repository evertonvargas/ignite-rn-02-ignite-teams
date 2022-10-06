import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as S from "./styles";

interface ButtonIconProps extends TouchableOpacityProps {
  nameIcon: keyof typeof MaterialIcons.glyphMap;
  type?: S.IconButtonProps;
}

export function ButtonIcon({
  nameIcon,
  type = "PRIMARY",
  ...rest
}: ButtonIconProps) {
  return (
    <S.Container {...rest}>
      <S.Icon name={nameIcon} type={type} />
    </S.Container>
  );
}
