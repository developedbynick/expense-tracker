import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SemiBold from "../text-components/SemiBold";
import Bold from "../text-components/Bold";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { currencyFormat } from "../../helpers";
import { useDispatch } from "react-redux";
const TabItem = ({ color, obj, type }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    if (type === "incomes") {
      dispatch({ type: "REMOVE_INCOME_ITEM", id: obj.id });
    } else dispatch({ type: "REMOVE_EXPENSE_ITEM", id: obj.id });
  };
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabItem}>
        <Bold numberOfLines={2} style={{ color, fontSize: 14, flex: 1 }}>
          {obj.name}
        </Bold>
        <View style={styles.deleteBtnAndPriceContainer}>
          <SemiBold numberOfLines={1} style={{ color, fontSize: 12 }}>
            {currencyFormat(obj.price)}
          </SemiBold>
          <TouchableOpacity onPress={handleDeleteItem}>
            <Ionicons
              name="ios-trash-outline"
              size={22}
              color={Colors.progressBarColor}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  tabContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItem: {
    width: "90%",
    backgroundColor: "white",
    minHeight: 50,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  deleteBtnAndPriceContainer: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-around",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
});
