import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from '../misc/colors';
import Expenses from '../components/expenses';
import AmountContainer from '../components/amountContainer';
import DashboardContainer from '../components/dashboardHeader';

import ExpContext, {Consumer} from "../contexts/ContextApi";

// import AddExpense from './addexpense';


interface Props {
  navigation: any
}


class Dashboard extends React.Component<Props> {

  static contextType = ExpContext

  state = {
    totalAmount: 0,
    isEdit: false,
    expenses : []
  }

  // constructor(super){
  //   this.super
  //   const {expenses, findExpenses} = this.context
  // }

  amountSet (expenses: any | null){

    // findExpenses()
    var amount = 0;
    // const allexpense = await AsyncStorage.getItem('expenses')
    // let { expenses: allexpense} = this.state
    if(expenses != null){
      const exps = expenses
      exps.forEach( ( element:any ) => {

        if(element != null ){
          const exp = element.expenses 
          // console.log(exp)
          if( exp != null && exp.length > 0 ){
            exp.forEach(el => {
              // console.log(el)
              amount += Number(el.expamount)
            });
          }else{
            // amount = exp[0].expamount
          }
        }

        this.setState({totalAmount: amount})
      });

    }

  }

  componentDidMount(){ 
    const {expenses, findExpenses} = this.context 
    findExpenses()
    this.setState({expenses})
    this.amountSet(expenses )
  }


  // componentDidUpdate(){
  //   // const {expenses, findExpenses} = this.context
  //   // findExpenses()
  //   // this.setState({expenses})
  //   // this.amountSet(expenses )
  // }

  render() {
 const { isEdit, totalAmount } = this.state

    return (
      <View style={styles.container}>


        
        {/* 
       /Consuming another way 
        <UserConsumer>
          {(props) => {
            return <div>{props.name}</div>
          }}
        </UserConsumer> */}


       <DashboardContainer  />

        <AmountContainer totalAmount={totalAmount} />

        <View style={styles.listTitle}> 
            <Text style={{color:colors.DARK,fontSize:20,fontWeight:'400'}}>All Expenses</Text>
            <Text style={{color:colors.TGRAY,fontWeight:'bold',backgroundColor:colors.GRAY, padding:10,borderRadius:30, }}>View All</Text>
        </View>

          <Expenses expenses={this.state.expenses} />

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