import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Page,
  PlayerInCategorySelection,
  Categories,
  AutoScaleText,
} from "@src/components";
import { AppContext } from "@src/store";
import { SCORE_TO_WIN, SCREENS } from "@src/constants";
import { Player } from "@src/types";

const styles = StyleSheet.create({
  page: { width: "80%", height: "100%", alignItems: "center" },
  header: { fontSize: 128 },
  player: { flex: 2 },
  categories: { flex: 1, marginBottom: 16 },
});

const CategorySelection = ({ navigation }) => {
  const { playerToChooseCategory, players, categories, resetGame } =
    useContext(AppContext);
  const player = players.get(playerToChooseCategory);
  const playerHasWon =
    [...players.values()].filter((player: Player) => player.lives > 0)
      .length === 1;

  if (playerHasWon) {
    setTimeout(() => {
      navigation.navigate(SCREENS.main);
      resetGame();
    }, 1000);
  }

  const handleCategoryPressed = (category: string) => {
    navigation.navigate(SCREENS.GAME, { category, playerToActFirst: player });
  };

  return (
    <Page>
      <View style={styles.page}>
        <AutoScaleText style={styles.header}>CHOOSE CATEGORY</AutoScaleText>
        <PlayerInCategorySelection player={player} style={styles.player} />
        <Categories
          categories={categories}
          style={styles.categories}
          onCategoryPressed={handleCategoryPressed}
        />
      </View>
    </Page>
  );
};

export default CategorySelection;
