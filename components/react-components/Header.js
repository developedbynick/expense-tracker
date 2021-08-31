import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import Constants from "expo-constants";
import Modal from "./Modal";
const Header = () => {
  const state = useSelector((state) => state);
  const [isVisibe, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => setIsVisible(true);

  useEffect(() => {
    const load = async () => {
      try {
        const state = await AsyncStorage.getItem("state");
        dispatch({ type: "SET_STATE", state: JSON.parse(state) });
      } catch (error) {
        Alert.alert(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const setStorage = async () => {
      try {
        await AsyncStorage.setItem("state", JSON.stringify(state));
      } catch (error) {
        Alert.alert(error);
      }
    };
    setStorage();
  }, [state]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity activeOpacity={0.4} onPress={openModal}>
          <Ionicons
            name="ios-add-circle-outline"
            color={Colors.mainTextColor}
            size={30}
          />
        </TouchableOpacity>
        <Modal isVisible={isVisibe} setIsVisible={setIsVisible} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: Constants.statusBarHeight + 10,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});
