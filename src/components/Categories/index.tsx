import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@src/components";
import { NUMBER_OF_CATEGORIES_TO_SELECT } from "@src/constants";

const styles = StyleSheet.create({
  categories: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    flex: 1,
    marginBottom: 32,
    gap: 16,
  },
  category: {
    flex: 1,
  },
  categoryText: {
    paddingLeft: 32,
    paddingRight: 32
  }
});

const Categories = ({ categories, onCategoryPressed }) => {
  return (
    <View style={styles.categories}>
      {categories
        .slice(0, NUMBER_OF_CATEGORIES_TO_SELECT)
        .map((category: string) => {
          const handlePress = () => {
            onCategoryPressed(category);
          };

          return (
            <Button
              key={category}
              style={styles.category}
              textStyles={styles.categoryText}
              onPress={handlePress}
            >
              {category}
            </Button>
          );
        })}
    </View>
  );
};

export default Categories;
