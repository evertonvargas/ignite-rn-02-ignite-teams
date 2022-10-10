import { useState } from "react";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Groups() {
  const [groups, setGroups] = useState([]);
  const { navigate } = useNavigation();

  function handleNewGroup() {
    navigate("new");
  }

  return (
    <S.Container>
      <Header />
      <HighLight title="Turmas" subtitle="jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar uma turma" />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </S.Container>
  );
}
