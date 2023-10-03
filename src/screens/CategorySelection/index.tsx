import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Page, Button } from "@src/components";
import { AppContext } from "@src/store";
import { NUMBER_OF_CATEGORIES_TO_SELECT, SCREENS } from "@src/constants";

const styles = StyleSheet.create({
  playerToChooseCategory: {
    fontSize: 32,
    marginBottom: 128
  },
  categories: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: 16,
  },
  category: {
    height: 64,
  }
});

const CategorySelection = ({ navigation }) => {
  const { playerToChooseCategory, categories } = useContext(AppContext);

  const handleCategoryPressed = (category: string) => {
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
              <Button key={category} style={styles.category} onPress={handlePress}>{category}</Button>
            );
          })}
      </View>
    </Page>
  );
};

export default CategorySelection;
