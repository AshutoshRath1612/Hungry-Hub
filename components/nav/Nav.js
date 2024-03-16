import { StyleSheet, Text, View,Image } from 'react-native'
import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Kha Lo </Text>
        <Image style={styles.navImage} source={require('../../assets/adaptive-icon.png')}></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'lightblue',
        height:50,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    heading:{
        fontSize:20,
        fontWeight: "bold",
    },
    navImage:{
        flex:1,
        height:60,
        width:6
    }
})