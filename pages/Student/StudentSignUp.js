import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';


export default function StudentSignUp({navigation}) {
  return (
    <LinearGradient colors={['lightblue','pink','violet']} style={styles.container}>
    <View style={styles.topic}>
    <Image style={styles.logo} resizeMode='contain' source={require('../../assets/Logo.png')} />
      <Text style={styles.title}>SignUp</Text>
    </View>
    <View style={styles.form}>
      <TextInput
        // onChangeText={handleRegdChange}
        // value={regdNo}
        keyboardType='numeric'
        placeholder='Registration Number'
        style={styles.input}
        // onFocus={changeFocus}
        // onBlur={changeFocus}
      />
      <TextInput
    //   onChangeText={handlePasswordChange}
        placeholder='Password'
        // onFocus={changeFocusPass}
        // onBlur={changeFocusPass}
        secureTextEntry={true}
        // value={password}
        style={styles.input}
      />
      <TextInput
        placeholder='Confirm Password'
        style={styles.input}
        />
    <TextInput
        placeholder='Mobile Number'
        style={styles.input}
        />
      <Pressable style={styles.btn}><Text style={styles.btnText}>Sign Up</Text></Pressable>
    </View>
    <Text style={{fontSize:18}}>Already a User? <Text style={styles.signup} onPress={()=>navigation.navigate('Login')}>Login</Text></Text>
    </LinearGradient>
  )
}



const styles =  StyleSheet.create({
    container:{
        justifyContent:'space-around',
        height:'100%',
        width:'100%',
        alignItems:'center',
    },
    topic:{
        justifyContent:'space-around',
        alignItems:'center',
        height:'20%'
    },
    title:{
        fontSize:40,
        fontFamily:'Ubuntu_700Bold'
    },
    logo:{
        height:'50%'
    },
    form:{
        height:'40%',
        justifyContent:'space-between',
    },
    input:{
        height: 50, 
        width:300,
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 5,
        textAlign:'center',
        borderRadius:20
    },
    btn:{
      backgroundColor:'#a465f4',
      borderRadius: 20,
      height:50,
      fontWeight: 'bold',
      alignItems:'center',
      justifyContent:'center',
      padding:5,
      paddingHorizontal:10
  },
  btnText:{
      fontWeight:'bold',
      fontSize:20,
      color:'white'
  },
  signup:{
    color:'blue'
  }
})