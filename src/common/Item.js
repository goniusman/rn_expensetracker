import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

import { useExpense } from "../contexts/ExpProvider";
import colors from '../misc/colors';

const Item = ({ expense }) => {
  const navigation = useNavigation()
  const { expamount, expdesc, expmode, expdate, id } = expense;

  const { expenses, setExpenses, findExpenses } = useExpense();
 
  const deleteItem = async (id) => {
    console.log(id);
    let newarr = []
    expenses.forEach(element => {
      console.log( element);
      // newarr = element.expenses
      
      // newarr = element.expenses.filter(item => item.id !== id)
    });
    expenses = newarr;
    setExpenses(expenses);
    await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
    findExpenses();
    console.log('success');
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddExpense', {isEdit:true, exp:expense})} >
      <View style={styles.item}>
        <Image style={styles.tinyLogo} source={require('../../assets/icon.png')} />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{color:colors.DARK,fontSize:16, fontWeight:'bold'}}>{expmode}</Text> 
          <Text numberOfLines={3} style={{color:colors.TGRAY,fontSize:12}}>{expdesc}</Text>
        </View>
        <Text style={{color:colors.DARK,fontWeight:'bold', marginRight:10 }}>Tk. {expamount}</Text>
        <View>
          <FontAwesome 
            name="trash" size={20}
            color={colors.TGRAY} 
            style={styles.trashIcon}
            onPress={()=>deleteItem(id)}
            />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 20
  }, 
  item:{ 
    backgroundColor: colors.GRAY,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 7,
    borderRadius: 20,
    marginBottom: 5
  },
  trashIcon: {
    marginRight: 5,
    marginLeft: 10,
    zIndex: 99999,
    padding: 10 
  } 
});

export default Item;