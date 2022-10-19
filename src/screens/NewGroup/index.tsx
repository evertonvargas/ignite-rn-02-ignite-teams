import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/groups/groupCreate";
import { AppError } from "@utils/AppError";

import * as S from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const { navigate } = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await groupCreate(group);
      navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
        console.log(error);
      }
    }
  }

  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <HighLight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </S.Content>
    </S.Container>
  );
}
