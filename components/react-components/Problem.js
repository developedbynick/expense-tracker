import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import Bold from "../text-components/Bold";

const Problem = ({
  message = "There was an error in starting the app. Please close the app and try again.",
}) => {
  return (
    <View style={styles.centered}>
      <Bold>{message}</Bold>
    </View>
  );
};

export default Problem;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.mainAppBackground,
  },
});
