import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { store } from "./data";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import Colors from "./constants/Colors";
// Components
import DisposableAndProgress from "./components/react-components/DisposableAndProgress";
import Header from "./components/react-components/Header";
import IncomeOrExpensesTab from "./components/react-components/IncomeOrExpensesTab";
import Bold from "./components/text-components/Bold";
import Problem from "./components/react-components/Problem";
export default function App() {
  const [loaded, error] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
  });
  if (!loaded)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.mainTextColor} />
      </View>
    );
  if (error) {
    return <Problem />;
  }
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <DisposableAndProgress />
        <IncomeOrExpensesTab />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainAppBackground,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.mainAppBackground,
  },
});
