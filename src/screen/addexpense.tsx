import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import uuid from "react-native-uuid";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import colors from "../misc/colors";
import ExpContext, {useExpense} from "../contexts/ContextApi";
const countries = [
  "Other",
  "Snacks",
  "Gift",
  "Subscription",
  "Internet Purchanged",
  "Dinner",
  "Breakfast",
];

import FormSubmitButton from "../common/FormSubmitBtn";

const AddExpense = (props: { route: { params: { exp: any; isEdit: any; }; }; }) => {
  const navigation = useNavigation();
  const { exp, isEdit } = props.route.params;
  // console.log(props.route.params)
  // const [error, setError] = useState("")
  const [expense, setExpense] = useState({
    id: uuid.v4(),
    expmode: "",
    expamount: "",
    expdesc: "",
    expdate: new Date().toLocaleDateString(),
  });
 
  useEffect(() => {
    if (isEdit) {
      setExpense({
        ...expense,
        id: exp.id,
        expmode: exp.expmode,
        expamount: exp.expamount,
        expdesc: exp.expdesc,
        expdate: exp.expdate,
      });
    }
  }, [isEdit]);

  const { expenses, setExpenses, findExpenses, totalAmount } = useExpense();

  const handleOnChangeText = (value: string, fieldname: string) => {
    setExpense({ ...expense, [fieldname]: value });
  };

  const handleSubmit = async () => {
    const newdate = new Date().toLocaleDateString();
    const { expmode, expamount, expdate, expdesc, id } = expense;

    if (expmode == "") {
      alert("Please type Expense mode!");
      return false;
    }

    if (expamount == "") {
      alert("May be You forgot to input expamount!");
      return false;
    }

    if (expdesc == "") {
      alert("A little descript about your expense!");
      return false;
    }

    if (isEdit) {
      let { expmode, expamount, expdesc, expdate, id } = expense; 
      let specificItem = expenses.filter((item) => item.date === expdate);
      let newarr = specificItem[0].expenses;
   
      newarr.map((item) => { 
        if (item.id == id) {
          // console.log(item)
          (item.expmode = expmode),
            (item.expamount = expamount),
            (item.expdesc = expdesc),
            (item.expdate = expdate);
        }
      }); 

      // // expenses.push(newarr);
      setExpenses(expenses);
      await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
 
      

      // console.log(expdate)
      // console.log(expenses)
    } else {
      if (expenses.length == 0 || expenses == null) {
        let newobj = {};
        newobj["date"] = new Date().toLocaleDateString();
        newobj["expenses"] = [expense];
        expenses.push(newobj);
        setExpenses(expenses);
        await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
   
      } else {
        let existingDate = expenses.filter((item: { date: string; }) => {
          if (item.date === newdate) {
            return true;
          } else {
            return false;
          }
        });

        if (existingDate.length !== 0) {
          expenses.map(async (item: { date: any; expenses: { id: string | number[]; expmode: string; expamount: string; expdesc: string; expdate: string; }[]; }) => {
            let fdate = item.date;

            if (fdate === newdate) {
              item.expenses.push(expense);
              setExpenses(expenses);
              await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
            
            }
          });
        } else {
          let newobj = {};
          newobj["date"] = new Date().toLocaleDateString();
          newobj["expenses"] = [expense];
          expenses.push(newobj);
          setExpenses(expenses);
          await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
       
        }
      }
    }

    setExpense({
      id: uuid.v4(),
      expmode: "",
      expamount: "",
      expdesc: "",
      expdate: new Date().toLocaleDateString(),
    });

    totalAmount()
    findExpenses()

    navigation.navigate('Dashboard')
  };

  const { expmode, expamount, expdesc, expdate } = expense;
  // console.log(expense)
  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <View>
          <Text style={{ marginLeft: 50, marginTop: 30, color: colors.TGRAY }}>
            Amount
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Tk.{" "}
            </Text>
            <TextInput
              value={expamount}
              name="expamount"
              onChangeText={(value) => handleOnChangeText(value, "expamount")}
              placeholder="45..."
              label="ExpAmount"
              keyboardType="numeric"
              style={styles.amountInput}
            />
            <Text style={{ flex: 1, color: colors.TGRAY }}>BDT</Text>
          </View>
          <Text
            style={{
              width: "100%",
              backgroundColor: colors.DARK,
              height: 3,
              marginTop: 20,
            }}
          ></Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{ marginLeft: 10, marginBottom: 5, color: colors.TGRAY }}
          >
            Expense Mode For
          </Text>
          <SelectDropdown
            data={countries}
            // defaultValueByIndex={1}
            // defaultValue={expmode}
            onSelect={(selectedItem, index) => {
              setExpense({ ...expense, ["expmode"]: selectedItem });
            }}
            defaultButtonText={"Select One"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>

        <View>
          <Text style={{ color: colors.TGRAY, padding: 10, marginTop: 20 }}>
            Description
          </Text>
          <TextInput
            value={expdesc}
            name="expdesc"
            onChangeText={(value) => handleOnChangeText(value, "expdesc")}
            placeholder="45"
            label="ExpDesc"
            placeholder="A little explain here.."
            style={styles.expenseDesc}
          />
        </View>

        <View>
          <FormSubmitButton
            // submitting={isSubmitting}
            onPress={handleSubmit}
            title={isEdit ? "Update Expense" : "Add Expense"} submitting={undefined}          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  amountInput: {
    borderWidth: 0,
    flex: 3,
    fontSize: 35,
    padding: 10,
  },

  dropdown1BtnStyle: {
    width: "90%",
    // height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
  },
  dropdown1DropdownStyle: {
    backgroundColor: "#EFEFEF",
  },
  dropdown1RowStyle: {
    // backgroundColor: '#EFEFEF',
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left",
  },

  expenseDesc: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
});
