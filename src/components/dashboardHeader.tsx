import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import colors from '../misc/colors';

const DashboardContainer = () => {
  return (
    <View style={styles.header}> 
        <MaterialIcons style={{flex:1,fontWeight:'bold'}} name="dashboard" size={32} color={colors.DARK} borderRadius={12} backgroundColor="black" />
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Image style={styles.tinyLogo} source={require('../../assets/icon.png')} />
    </View>
  )
}

export default DashboardContainer

const styles = StyleSheet.create({
  header:{
    // backgroundColor: 'red',
    
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingLeft: 10,
    height:90,
    alignItems: 'center',
    marginTop: 40
  },
  headerTitle:{
    flex:5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
})