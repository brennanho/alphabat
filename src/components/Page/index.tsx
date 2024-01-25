import React, { useContext } from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { AppContext } from "@src/store";

const styles = StyleSheet.create({
  page: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});

const Page = ({ children }) => {
  const {
    assets: { images },
  } = useContext(AppContext);
  return (
    <ImageBackground source={images.background.main} resizeMode="cover">
      <SafeAreaView style={styles.page}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default Page;
