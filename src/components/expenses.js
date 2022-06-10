import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
// import { useNavigation } from '@react-navigation/native';

import {useExpense} from '../contexts/ExpProvider'
import Item from '../common/Item';
import colors from '../misc/colors';

const Expenses = () => {
// const navigation = useNavigation()
const today = new Date().toLocaleDateString();

const { expenses } = useExpense()
  return (
    <ScrollView style={{paddingRight:10,paddingLeft:10}}>
      {
         expenses.reverse().map((item, index) => (
            <View key={index} style={styles.itemContainer}> 
                <Text style={{fontSize:12, color: colors.TGRAY, marginBottom: 10}}>{item.date  == today ? "Today" : item.date }</Text> 
                {
                  item.expenses && item.expenses.reverse().map((expense, index) => (
                    <Item key={index} expense={expense} isEdit={true} />
                  ))
                }
            </View>
                
          ))
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