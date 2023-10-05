import React from "react";
import { Video, ResizeMode } from 'expo-av';
import { Asset } from 'expo-asset';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions } from "react-native";
import { ANIMATIONS } from "@assets/index";

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
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

const Page = ({ children }) => {
  return (
    <>
      {/* <Video
        style={styles.background}
        source={ANIMATIONS.BACKGROUND_WAVES}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      /> */}
      <SafeAreaView style={styles.page}>{children}</SafeAreaView>
    </>
  );
};

export default Page;
