import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import Regular from "../text-components/Regular";
import Bold from "../text-components/Bold";
import { useDispatch } from "react-redux";
// Models
import Income from "../../model/Income";
import Expense from "../../model/Expense";
// Packages
import uuid from "uuid/v4";
const ModalComponent = ({ isVisible, setIsVisible }) => {
  const [titleValue, setTitleValue] = useState("");
  const [monetaryValue, setMonetaryValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("income");
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsVisible(false);
    setTitleValue("");
    setMonetaryValue("");
  };
  const handleSubmit = () => {
    //  1) Validate
    if (titleValue.trim().length === 0 || monetaryValue.trim().length === 0)
      return Alert.alert(
        "Input Fields",
        "Please Check to ensure that you have filled out the form properly. "
      );
    //  2) income
    if (selectedValue === "income") {
      const income = new Income(
        uuid(),
        titleValue.trim(),
        parseInt(monetaryValue.trim())
      );
      dispatch({
        type: "ADD_INCOME",
        income,
      });
    }
    //  3) expense
    if (selectedValue === "expense") {
      const expense = new Expense(
        uuid(),
        titleValue.trim(),
        parseInt(monetaryValue.trim())
      );
      dispatch({
        type: "ADD_EXPENSE",
        expense,
      });
    }
    // 4) Close Modal
    closeModal();
  };
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* Background Overlay */}
          <View style={styles.form}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons
                  name="ios-close-circle-outline"
                  color="red"
                  size={30}
                />
              </TouchableOpacity>
            </View>
            {/* Form Data */}
            <View style={styles.formInputsAndButtons}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) =>
                  setSelectedValue(itemValue.trim())
                }
                style={styles.picker}
                mode="dropdown"
              >
                <Picker.Item
                  label="Income"
                  value="income"
                  fontFamily="Quicksand-Bold"
                  color={Colors.mainTextColor}
                />
                <Picker.Item
                  label="Expense"
                  value="expense"
                  fontFamily="Quicksand-Bold"
                  color={Colors.mainTextColor}
                />
              </Picker>
              <View style={styles.hr} />
              <View style={styles.textInputsAndButtons}>
                <View style={styles.textInputContainer}>
                  <Regular style={styles.label}>Title</Regular>
                  <TextInput
                    placeholder="Give your expense or income a name"
                    style={styles.textInput}
                    value={titleValue}
                    onChangeText={(newTitle) => setTitleValue(newTitle)}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <Regular style={styles.label}>Value</Regular>
                  <TextInput
                    placeholder="The monetary value of your income or expense."
                    style={styles.textInput}
                    keyboardType="number-pad"
                    value={monetaryValue}
                    onChangeText={(monetaryValue) =>
                      setMonetaryValue(monetaryValue)
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  style={styles.submit}
                >
                  <Bold style={styles.submitText}>Submit</Bold>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    minHeight: 30,
    width: "95%",
    maxWidth: 345,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  textInputsAndButtons: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  textInputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
  },
  textInput: {
    minHeight: 30,
    borderBottomColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  submit: {
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultButtonColor,
    borderRadius: 5,
    marginTop: 15,
    height: 40,
  },
  submitText: {
    color: "white",
    fontSize: 16,
  },
  hr: {
    borderBottomColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 2,
    margin: 8,
  },
});
