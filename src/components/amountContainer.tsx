import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

import colors from '../misc/colors';
import {useExpense} from '../contexts/ContextApi'

const AmountContainer = ({totalAmount}) => {

  const { amount, setExpenses, findExpenses } = useExpense();

  return (
    <View style={styles.amountContainer}> 
        {/* <FontAwesome name="dollar" size={30} color="white"  /> */}
        <Text style={{flex:2, fontWeight:'bold', color: colors.LIGHT}}>Tk</Text>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={{color:'white',fontWeight:'bold'}}>BDT</Text>
    </View>
  )
}

export default AmountContainer

const styles = StyleSheet.create({
  amountContainer:{
    backgroundColor: colors.DARK,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingRight: 20,
    // paddingLeft: 20,
    padding: 30,
    alignItems: 'center',
    // alignItems: 'flex-end',
    color: colors.LIGHT,
    borderRadius: 50
  },
  amount:{
    fontSize:50,
    fontWeight: 'bold',
    flex: 15,
    color: colors.LIGHT,
  },
})