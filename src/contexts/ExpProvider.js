import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const ExpContext = createContext();

const ExpProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const findExpenses = async () => {
    const result = await AsyncStorage.getItem("expenses");
    // await AsyncStorage.removeItem("expenses")
    console.log(result);
    if (result !== null) setExpenses(JSON.parse(result));
  };

  useEffect(() => {
    findExpenses();
  }, []);

  return (
    <ExpContext.Provider value={{ expenses, setExpenses, findExpenses }}>
      {children}
    </ExpContext.Provider>
  );
};

export const useExpense = () => useContext(ExpContext);

export default ExpProvider;
