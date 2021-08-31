import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

const SemiBold = (props) => {
  return (
    <Text {...props} style={[styles.semiBold, props.style]}>
      {props.children}
    </Text>
  );
};

export default SemiBold;

const styles = StyleSheet.create({
  semiBold: {
    fontFamily: "Quicksand-SemiBold",
    color: Colors.mainTextColor,
  },
});
