import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
const Regular = (props) => {
  return (
    <Text {...props} style={[styles.regular, props.style]}>
      {props.children}
    </Text>
  );
};

export default Regular;

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Quicksand-Bold",
    color: Colors.mainTextColor,
  },
});
