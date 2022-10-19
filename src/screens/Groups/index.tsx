import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { groupsGetAll } from "@storage/groups/groupsGetAll";

import * as S from "./styles";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const { navigate } = useNavigation();

  function handleNewGroup() {
    navigate("new");
  }

  function handleOpenGroup(nameGroup: string) {
    navigate("players", { group: nameGroup });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <S.Container>
      <Header />
      <HighLight title="Turmas" subtitle="jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar uma turma" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </S.Container>
  );
}
