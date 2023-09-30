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

  const handleCategoryPressed = () => {
    navigation.navigate(SCREENS.GAME);
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
            return (
              <Button
                key={category}
                text={category}
                onPress={handleCategoryPressed}
              />
            );
          })}
      </View>
    </Page>
  );
};

export default CategorySelection;
