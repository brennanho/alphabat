import React, { useContext } from "react";
import { Page, Player, Categories } from "@src/components";
import { AppContext } from "@src/store";
import { SCORE_TO_WIN, SCREENS } from "@src/constants";

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
    navigation.navigate(SCREENS.GAME, { category });
  };

  return (
    <Page>
      <Player player={player} />
      <Categories
        categories={categories}
        onCategoryPressed={handleCategoryPressed}
      />
    </Page>
  );
};

export default CategorySelection;
