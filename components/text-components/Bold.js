import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

const Bold = (props) => {
  return (
    <Text {...props} style={[styles.boldText, props.style]}>
      {props.children}
    </Text>
  );
};

export default Bold;

const styles = StyleSheet.create({
  boldText: {
    fontFamily: "Quicksand-Bold",
    color: Colors.mainTextColor,
  },
});
