import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import ExpContext, {Provider} from './ContextApi'

// const ExpContext = createContext();

const ExpProvider = ({ children }) => {

  const [expenses, setExpenses] = useState([]);
  var [amount, setAmount] = useState(0)

  const findExpenses = async () => {
    const result = await AsyncStorage.getItem("expenses");
    // await AsyncStorage.removeItem("expenses") 
    // await AsyncStorage.setItem("expenses", JSON.stringify()    
     
    if(result == null){  
      await AsyncStorage.setItem("expenses", JSON.stringify( []));
    }
    
    // console.log(result); 
    if (result != null){
      let exps = JSON.parse(result)
       setExpenses(exps.reverse());   
    } 


  };  

  const totalAmount = () => {

    // findExpenses()
    // var amount = 0;
    // const allexpense = await AsyncStorage.getItem('expenses')
    // let { expenses: allexpense} = this.state
    var countAmount = 0
    if(expenses != null){
      const exps = expenses
      exps.forEach( ( element:any ) => {

        if(element != null ){
          const exp = element.expenses 
          // console.log(exp)
          if( exp != null && exp.length > 0 ){
            exp.forEach(el => {
              // console.log(el)
              countAmount += Number(el.expamount)
            }); 
          }
          // else{ 
          //   // countAmount = exp[0].expamount
          // }
        }
      });
    }
    setAmount(countAmount)
  }




  useEffect(() => {
    findExpenses();
    totalAmount()
  }, []);
 
  return (
    <Provider value={{ expenses, amount, totalAmount, setExpenses, findExpenses }}>
      {children}
    </Provider>
  );
};

// export const useExpense = () => useContext(ExpContext);
// export const MyContext = ExpContext
export default ExpProvider;
