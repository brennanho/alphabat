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
    marginTop: StatusBar.currentHeight,
  },
  background: {
    // width: "100%",
    // height: "100%",
  },
});

const Page = ({ children }) => {
  const {
    assets: { images },
  } = useContext(AppContext);

  return (
    <ImageBackground
      style={styles.background}
      source={images.background.main}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.page}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default Page;
