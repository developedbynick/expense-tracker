import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Bold from "../text-components/Bold";
import SemiBold from "../text-components/SemiBold";
import { useSelector } from "react-redux";
import * as Progress from "react-native-progress";
import Colors from "../../constants/Colors";
import { currencyFormat } from "../../helpers";
const DisposableAndProgress = () => {
  const { disposableIncome, percentage } = useSelector((state) => state);
  return (
    <View style={styles.disposableAndProgressContainer}>
      <Bold style={styles.disposableIncome}>
        {currencyFormat(disposableIncome)}
      </Bold>
      <View style={styles.progressAndIndicatorTextContainer}>
        <Progress.Bar
          progress={percentage}
          color={Colors.progressBarColor}
          height={15}
          width={300}
          style={styles.progressBar}
        />
        <SemiBold style={styles.indicator}>
          {(percentage * 100).toFixed(1)}%
        </SemiBold>
      </View>
    </View>
  );
};

export default DisposableAndProgress;

const styles = StyleSheet.create({
  disposableAndProgressContainer: {
    height: "40%",
    paddingVertical: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  disposableIncome: {
    fontSize: 25,
    fontWeight: "900",
  },
  progressAndIndicatorTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    width: "70%",
    marginVertical: 10,
    height: 15,
  },
  indicator: {
    marginLeft: 10,
    fontSize: 16,
  },
});
