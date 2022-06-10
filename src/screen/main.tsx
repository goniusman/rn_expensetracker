import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from '../misc/colors';
import Expenses from '../components/expenses';
import AmountContainer from '../components/amountContainer';
import DashboardContainer from '../components/dashboardHeader';
import AddExpense from './addexpense';


interface Props {
  navigation: any
}


class Dashboard extends React.Component<Props> {
 
  state = {
    totalAmount: 0,
    isEdit: false
  }

  cleckme = (ed: any) => {
    console.log(ed)
  }

  async amountSet (){
    var amount = 0;
    const allexpense = await AsyncStorage.getItem('expenses')
    if(allexpense != null){
        const exps = JSON.parse(allexpense)
   
    exps.forEach( ( element:any ) => {
      const exp = element.expenses 
      // console.log(exp) 

      for (let i = 0; i < exp.length; i++) {
        const element = Number(exp[i].expamount);
        console.log(element)
        amount += element
      }


      // exp.forEach(el => {
      //   // console.log(el)
      //   amount += Number(el.expamount)
      // });
    });
    this.setState({totalAmount: amount})
    }
  
    console.log(amount)
  }

  componentDidUpdate(){
    this.amountSet()
  }

  render() {
 const { isEdit, totalAmount } = this.state

    return (
      <View style={styles.container}>

       <DashboardContainer  />

        <AmountContainer totalAmount={totalAmount} />

        <View style={styles.listTitle}> 
            <Text style={{color:colors.DARK,fontSize:20,fontWeight:'400'}}>All Expenses</Text>
            <Text style={{color:colors.TGRAY,fontWeight:'bold',backgroundColor:colors.GRAY, padding:10,borderRadius:30, }}>View All</Text>
        </View>

          <Expenses />

        <TouchableOpacity>
          <FontAwesome name="plus" size={20} style={styles.addExpense} onPress={() => {  this.props.navigation.navigate('AddExpense', {isEdit:false, exp: null})  }} />
        </TouchableOpacity>

        {/* <AddExpense /> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
 
  container: {
    backgroundColor:colors.LIGHT,
    flex:1
  },
  listTitle:{
    // backgroundColor: 'red',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20 
  },
  addExpense:{
    backgroundColor: colors.DARK,
    borderRadius:50,
    color: colors.LIGHT,  
    width:50, 
    height: 50,
    textAlign: 'center', 
    flexDirection:'column', 
    position:'absolute', 
    bottom: 50, 
    right: 25,
    paddingTop: 14,
    zIndex: 999
  }
})

export default Dashboard;