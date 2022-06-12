import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useExpense} from '../contexts/ContextApi'
import Item from '../common/Item';
import colors from '../misc/colors';

const Expenses = () => {
  // const [expensess, setExpensess] = useState([])
   
const navigation = useNavigation()

const { expenses, setExpenses, findExpenses } = useExpense();

useEffect(() => {
  

  findExpenses()
  
}, [])


const today = new Date().toLocaleDateString();

return ( 
    <ScrollView style={{paddingRight:10,paddingLeft:10}}>
      { 
       expenses && expenses.length > 0 ?  expenses.map((item, index) => (
          item.expenses && item.expenses.length > 0  ?  
            <View key={index} style={styles.itemContainer}> 
                <Text style={{fontSize:12, color: colors.TGRAY, marginBottom: 10}}>{ item && item.date  == today ? "Today" : item.date }</Text> 
                  { 
                    item.expenses && item.expenses.map((expense, index) => (
                      <Item key={index} expense={expense} isEdit={true} />
                    ))
                  }
            </View>
        : null 
          ))
        : <Text style={{textAlign:'center', color: colors.TGRAY, marginLeft: 20}}>There are no expense list.</Text>
        }
    </ScrollView>
  )
}

export default Expenses

const styles = StyleSheet.create({
  itemContainer:{
    marginBottom: 20
  },

}) 