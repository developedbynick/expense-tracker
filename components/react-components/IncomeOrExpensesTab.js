import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Colors from "../../constants/Colors";
import Bold from "../text-components/Bold";
import SemiBold from "../text-components/SemiBold";
import { useSelector } from "react-redux";
import TabItem from "./TabItem";
const tabs = [
  {
    title: "Incomes",
    background: Colors.greenTabColorBackground,
    textColor: Colors.greenTabColorText,
  },
  {
    title: "Expenses",
    background: Colors.redTabColorBackground,
    textColor: Colors.redTabColorText,
  },
];

const IncomeOrExpensesTab = () => {
  const incomesAndExpenses = useSelector((state) => [
    state.incomes,
    state.expenses,
  ]);
  const [index, setIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(incomesAndExpenses[index]);
  useEffect(() => {
    setSelectedData(incomesAndExpenses[index]);
  }, [incomesAndExpenses, index]);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };
  const renderIncomeOrExpenseList = ({ item }) => {
    const type = index === 0 ? "incomes" : "expenses";
    return <TabItem color={tabs[index].textColor} type={type} obj={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          {tabs.map((tab, tabIndex) => {
            const isActiveTab = index === tabIndex;
            const TextComponent = isActiveTab ? Bold : SemiBold;
            const activeTouchableStyles = StyleSheet.create({
              active: {
                backgroundColor: tab.background,
                marginHorizontal: 10,
              },
              activeText: {
                color: tab.textColor,
                textTransform: "capitalize",
              },
            });

            return (
              <TouchableOpacity
                key={tabIndex}
                activeOpacity={0.9}
                style={[
                  styles.tab,
                  isActiveTab && activeTouchableStyles.active,
                ]}
                onPress={() => handleChangeIndex(tabIndex)}
              >
                <TextComponent
                  style={[isActiveTab && activeTouchableStyles.activeText]}
                >
                  {tab.title}
                </TextComponent>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* List */}
      {incomesAndExpenses[index].length === 0 ? (
        <View style={styles.centered}>
          <Bold style={{ fontSize: 20, textAlign: "center" }} numberOfLines={2}>
            You have no {index === 0 ? "incomes" : "expenses"}.
          </Bold>
        </View>
      ) : (
        <FlatList data={selectedData} renderItem={renderIncomeOrExpenseList} />
      )}
    </View>
  );
};

export default IncomeOrExpensesTab;

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    minHeight: 30,
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
