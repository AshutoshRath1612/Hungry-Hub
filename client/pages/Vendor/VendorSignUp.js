import { View, Text, StyleSheet, TextInput, Image,Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Host ,  UniqueVendorRoute } from '../../Constants';
import Container,{ Toast } from 'toastify-react-native';


const VendorSignUp = ({navigation}) => {

  const [vendorDetails, setVendorDetails] = useState({
    shopName: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    isStudent: false
  });

  const handleSubmit = () => {
    if(ValidDetails()){
      fetch(`${Host}${UniqueVendorRoute}/${vendorDetails.username}/${vendorDetails.mobileNo}`)
      .then(response => response.status)
      .then(data => {
        if(data === 200) {
          navigation.navigate('OTP', {vendorDetails})
        }
        else{
          Toast.error(`User already exists`)
        }
      })
      .catch(error => {
        Toast.error(error.message)
      })
    }
  }

  const ValidDetails = () => {
    if(vendorDetails.username === '' || vendorDetails.password === '' || vendorDetails.confirmPassword === '' || vendorDetails.mobileNo === '' || vendorDetails.shopName === ''){
      Toast.error(`All fields are mandatory`)
      return false
    }
    if(vendorDetails.username.length < 6){
      Toast.error(`Usernamae has to be atleast 6 characters`)
      return false
    }
    if(vendorDetails.password.length< 6){
      Toast.error(`Password has to be atleast 6 characters`)
      return false
    }
    if(vendorDetails.confirmPassword.length< 6){
      Toast.error(`Confirm Password has to be atleast 6 characters`)
      return false
    }
    if(vendorDetails.password!== vendorDetails.confirmPassword){
      Toast.error(`Passwords do not match`)
      return false
    }
    if(vendorDetails.mobileNo.length < 10){
      Toast.error(`Mobile No has to be 10 digits`)
      return false
    }
    else{
      return true
    }
  }

  return (
    <LinearGradient colors={["#C38888","#FFD7D7"]} style={styles.container}>
      <Container position='top' />
      <View style={styles.topic}>
        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/Logo.png')} />
        <Text style={styles.title}>SignUp</Text>
      </View>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <TextInput
          placeholder='Shop Name'
          style={styles.input}
          value={vendorDetails.shopName}
          onChangeText={(text) => setVendorDetails({ ...vendorDetails, shopName: text })}
        />
        <TextInput
          placeholder='Username'
          style={styles.input}
          value={vendorDetails.username}
          onChangeText={(text) => setVendorDetails({ ...vendorDetails, username: text })}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          value={vendorDetails.password}
          onChangeText={(text) => setVendorDetails({ ...vendorDetails, password: text })}
        />
        <TextInput
          placeholder='Confirm Password'
          style={styles.input}
          secureTextEntry={true}
          value={vendorDetails.confirmPassword}
          onChangeText={(text) => setVendorDetails({ ...vendorDetails, confirmPassword: text })}
        />
        <TextInput
          placeholder='Mobile Number'
          style={styles.input}
          value={vendorDetails.mobileNo}
          onChangeText={(text) => setVendorDetails({ ...vendorDetails, mobileNo: text })}
        />
        <Pressable style={styles.btn} onPress={()=>handleSubmit()}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Text style={{ fontSize: 18 }}>Already a User? <Text style={styles.signup} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
    </LinearGradient>
  );
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
        color:'#4C2E31',
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
        fontWeight:'bold',
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 5,
        textAlign:'center',
        borderRadius:20
    },
    btn:{
      backgroundColor:'#915858',
      borderRadius: 20,
      height:50,
      fontWeight: 'bold',
      alignItems:'center',
      justifyContent:'center',
      padding:5,
      paddingHorizontal:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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