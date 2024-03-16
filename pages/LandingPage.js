import {Button, Image, StyleSheet, Text, View , TouchableOpacity, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import {LinearGradient} from 'expo-linear-gradient';

export default class LandingPage extends Component {
  render() {
    return (
      <View  style={styles.container}>
      <Text style={styles.title}>Hungry Hub</Text>
      <LinearGradient style={styles.content} colors={['pink','purple']}>
      <Image style={styles.landingbg} source={require('../assets/LandingBG1.png')} resizeMode='contain'></Image>
      <View style={styles.about}>
        <Text style={styles.titleContent}>Great Food</Text>
        <Text style={styles.titleContent}>Is</Text>
        <Text style={styles.titleContent}>Great Mood</Text>
      </View>
     <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Get Started</Text></TouchableOpacity>
      </LinearGradient>
       </View> 
    )
  }
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#feedfc',
        height:'100%'
    },
    content:{
      backgroundColor:'pink',
      height:'50%',
      width:'80%',
      padding:20,
      borderRadius:60,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems:'center',
      marginTop:'50%'
    },
    landingbg:{
      height:'60%',
      width:'100%',
      position:'absolute',
      top:'-30%'
    },
    title:{
      fontSize:40,
      fontWeight:'bold'
    },
    about:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:100,
    },
    titleContent:{
      fontSize:40,
      color:'white',
      fontWeight:'bold',
    },
    btn:{
        backgroundColor:'#853dc2',
        borderRadius: 10,
        height:50,
        width:'40%',
        fontWeight: 'bold',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        position:'absolute',
        bottom:'-5%'
    },
    btnText:{
        fontWeight:'bold',
        fontSize:19,
        color:'white'
    }
})