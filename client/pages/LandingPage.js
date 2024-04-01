import {Button, Image, StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';


export default function LandingPage({navigation}){ 

    return (
      <LinearGradient colors={['lightblue' , 'violet']}  style={styles.container}>
      <Text style={styles.title} >Hungry Hub</Text>
      <LinearGradient style={styles.content} colors={['pink','purple']}>
      <Image style={styles.landingbg} source={require('../assets/LandingBG.png')} resizeMode='contain'></Image>
      <View style={styles.about}>
        <Text style={styles.titleContent}>Great Food</Text>
        <Text style={styles.titleContent}>Is</Text>
        <Text style={styles.titleContent}>Great Mood</Text>
      </View>
     <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Login')}><Text style={styles.btnText}>Get Started</Text></TouchableOpacity>
      </LinearGradient>
       </LinearGradient> 
    )
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
      fontFamily:'Ubuntu_700Bold',
    },
    about:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
    },
    titleContent:{
      fontSize:RFValue(30),
      color:'white',
      fontFamily:'Ubuntu_500Medium',
      fontWeight:'bold',
    },
    btn:{
        backgroundColor:'#853dc2',
        borderRadius: 10,
        height:50,
        width:'50%',
        fontWeight: 'bold',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:'-5%',
    },
    btnText:{
        fontWeight:'bold',
        fontSize:RFValue(15),
        color:'white'
    }
})