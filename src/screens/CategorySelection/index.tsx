import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Page, Player, Categories, AutoScaleText } from "@src/components";
import { AppContext } from "@src/store";
import { SCORE_TO_WIN, SCREENS } from "@src/constants";

const styles = StyleSheet.create({
  header: { fontSize: 128, paddingLeft: 24, paddingRight: 24, marginTop: 32 },
});

const CategorySelection = ({ navigation }) => {
  const { playerToChooseCategory, players, categories, resetGame } =
    useContext(AppContext);
  const player = players.get(playerToChooseCategory);

  if (player && player.score === SCORE_TO_WIN) {
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
      <AutoScaleText style={styles.header}>CHOOSE CATEGORY</AutoScaleText>
      <Player player={player} />
      <Categories
        categories={categories}
        onCategoryPressed={handleCategoryPressed}
      />
    </Page>
  );
};

export default CategorySelection;
