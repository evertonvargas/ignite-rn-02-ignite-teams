import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayCard } from "@components/PlayerCard";
import { Loading } from "@components/Loading";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "@storage/groups/groupRemoveByName";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { AppError } from "@utils/AppError";

import * as S from "./styles";

type ParamList = {
  Params: { group: string };
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const {
    params: { group },
  } = useRoute<RouteProp<ParamList, "Params">>();
  const { navigate } = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (playerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar"
      );
    }

    const newPlayer = {
      name: playerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert("Nova pessoa", "Não foi possível adicionar.");
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);

      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Grupo", "Não foi posível remover o grupo");
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <S.Container>
      <Header showBackButton />
      <HighLight title={group} subtitle="adicione a galera e separe os times" />
      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setPlayerName}
          value={playerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon nameIcon="add" onPress={handleAddPlayer} />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
      </S.HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 60 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </S.Container>
  );
}
