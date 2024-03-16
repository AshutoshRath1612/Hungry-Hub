import {Button, Image, StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {LinearGradient} from 'expo-linear-gradient';

export default class LandingPage extends Component {
  render() {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}  style={styles.container}>
        <Image source={require("../assets/Plate.png")} style={styles.image} />
        <Text style={styles.title}>Enjoy Your <Text style={styles.title}>Meal</Text> </Text>
        
        <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Get Started</Text></TouchableOpacity>
      </LinearGradient> 
    )
  }
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyContent:'space-evenly',
        alignItems: 'center',
        backgroundColor:'#4b319f',
        height:'100%',
    },
    title:{
        display:'flex',
        flexDirection: 'column',
        fontSize:40,
        color:'white',
        fontWeight:'bold',
        width:'50%'
    },
    btn:{
        backgroundColor:'white',
        borderRadius: 10,
        height:50,
        width:'40%',
        fontWeight: 'bold',
        alignItems:'center',
        justifyContent:'center',
        padding:5
    },
    btnText:{
        fontWeight:'bold',
        fontSize:19,
        color:'#36454F'
    }
})