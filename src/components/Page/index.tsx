import { SafeAreaView, StyleSheet, StatusBar, Dimensions } from "react-native";

const styles = StyleSheet.create({
  page: {
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
  return <SafeAreaView style={styles.page}>{children}</SafeAreaView>;
};

export default Page;
