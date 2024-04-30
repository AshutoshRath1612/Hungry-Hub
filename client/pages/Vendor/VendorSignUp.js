import { View, Text, StyleSheet, TextInput, Image,Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';


const VendorSignUp = ({navigation}) => {
  return (
    <LinearGradient colors={['#DFF5FF','#5356FF']} style={styles.container}>
    <View style={styles.topic}>
    <Image style={styles.logo} resizeMode='contain' source={require('../../assets/Logo.png')} />
      <Text style={styles.title}>SignUp</Text>
    </View>
    <KeyboardAvoidingView style={styles.form}>
      <TextInput
        placeholder='Shop Name'
        style={styles.input}
      />
      <TextInput 
      placeholder='Username'
      style={styles.input}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry={true}
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
    </KeyboardAvoidingView>
    <Text style={{fontSize:18}}>Already a User? <Text style={styles.signup} onPress={()=>navigation.navigate('Login')}>Login</Text></Text>
    </LinearGradient>
  )
}



const styles =  StyleSheet.create({
    container:{
        justifyContent:'space-evenly',
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
        color:'#003366',
        fontFamily:'Ubuntu_700Bold'
    },
    logo:{
        height:'50%'
    },
    form:{
        height:'60%',
        justifyContent:'space-between',
    },
    input:{
        height: 50, 
        width:300,
        borderColor: '#666666', 
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 5,
        textAlign:'center',
        borderRadius:20
    },
    btn:{
      backgroundColor:'#003366',
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
export default VendorSignUp