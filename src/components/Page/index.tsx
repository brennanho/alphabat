import { View, StyleSheet, StatusBar, Dimensions } from "react-native";

const styles = StyleSheet.create({
  page: {
    // position: "relative",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
  },
});

const Page = ({ children }) => {
  return <View style={styles.page}>{children}</View>;
};

export default Page;
