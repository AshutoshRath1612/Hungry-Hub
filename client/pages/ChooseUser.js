import { StyleSheet, Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function ChooseUser({navigation}){
    return (
      <LinearGradient style={styles.container} colors={['lightblue' , 'violet']} >
      <View style={styles.content}>
        <Text style={styles.title}>Who are you?</Text>
        <View style={styles.choice}>
        <Button title='Vendor' onPress={()=> navigation.navigate('Vendor Signup')}></Button>
        <Button title='Student' onPress={()=> navigation.navigate('Student Signup')}></Button>
      </View>
        </View>
      </LinearGradient>
    )
  }

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
    alignItems:'center',
    width:'100%',
    height:'20%',
    justifyContent:'space-evenly'
    },
    title:{
        fontSize:30,
        fontFamily:'Ubuntu_700Bold'
    },
    choice:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
    }
})