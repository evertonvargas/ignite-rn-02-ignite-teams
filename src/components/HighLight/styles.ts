import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 25px 0;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({theme})=> theme.FONT_SIZE.XL}px;
  font-family: ${({theme})=> theme.FONT_FAMILY.BOLD};
  text-align: center;
`

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({theme})=> theme.FONT_SIZE.MD}px;
  text-align: center;
`