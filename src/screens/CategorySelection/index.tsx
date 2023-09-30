import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Page, Button } from "@src/components";
import { AppContext } from "@src/store";
import { NUMBER_OF_CATEGORIES_TO_SELECT, SCREENS } from "@src/constants";

const styles = StyleSheet.create({
  playerToChooseCategory: {
    fontSize: 32,
  },
  categories: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
});

const CategorySelection = ({ navigation }) => {
  const { playerToChooseCategory, categories } = useContext(AppContext);

  const handleCategoryPressed = (category) => {
    navigation.navigate(SCREENS.GAME, { category });
  };

  return (
    <Page>
      <Text style={styles.playerToChooseCategory}>
        {playerToChooseCategory}
      </Text>
      <View style={styles.categories}>
        {categories
          .slice(0, NUMBER_OF_CATEGORIES_TO_SELECT)
          .map((category: string) => {
            const handlePress = () => {
              handleCategoryPressed(category);
            };

            return (
              <Button key={category} text={category} onPress={handlePress} />
            );
          })}
      </View>
    </Page>
  );
};

export default CategorySelection;
