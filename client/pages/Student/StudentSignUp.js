import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Container, { Toast } from 'toastify-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Host, UniqueStudentRoute } from '../../Constants';


export default function StudentSignUp({ navigation }) {
  const [studentDetails, setStudentDetails] = useState({
    regdNo: '',
    password: '',
    confirmPassword: '',
    mobileNo: ''
  });

  const handleSubmit = () => {
    if(ValidDetails()){
      fetch(`${Host}${UniqueStudentRoute}/${studentDetails.regdNo}/${studentDetails.mobileNo}`)
      .then(response => response.status)
      .then(data => {
        if(data === 200) {
          navigation.navigate('OTP', {studentDetails})
        }
        else{
          Toast.error(`User already exists`)
        }
      })
      .catch(error => {
        console.log(error.message)
        Toast.error(error.message)
      })
    }
  }

  const ValidDetails = () => {
    if(studentDetails.regdNo === '' || studentDetails.password === '' || studentDetails.confirmPassword === '' || studentDetails.mobileNo === ''){
      Toast.error(`All fields are mandatory`)
      return false
    }
    if(studentDetails.regdNo.length < 10){
      Toast.error(`Regd No has to be 10 digits`)
      return false
    }
    if(studentDetails.password.length< 6){
      Toast.error(`Password has to be atleast 6 characters`)
      return false
    }
    if(studentDetails.confirmPassword.length< 6){
      Toast.error(`Confirm Password has to be atleast 6 characters`)
      return false
    }
    if(studentDetails.password!== studentDetails.confirmPassword){
      Toast.error(`Passwords do not match`)
      return false
    }
    if(studentDetails.mobileNo.length < 10){
      Toast.error(`Mobile No has to be 10 digits`)
      return false
    }
    else{
      return true
    }
  }
  return (
<<<<<<< Updated upstream
    <LinearGradient colors={["#FFCC66", "#FF9933"]} style={styles.container}>
    <Container position='top' width='90%' textStyle={{fontSize:RFValue(15)}} />
      <View style={styles.topic}>
        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/Logo.png')} />
        <Text style={styles.title}>SignUp</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          onChangeText={(text) => setStudentDetails({ ...studentDetails, regdNo: text })}
          keyboardType='numeric'
          placeholder='Registration Number'
          style={styles.input}
=======
    <LinearGradient colors={['lightblue','pink','violet']} style={styles.container}>
    <View style={styles.topic}>
    <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/Logo.png')} />
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
>>>>>>> Stashed changes
        />
        <TextInput
          onChangeText={(text) => setStudentDetails({ ...studentDetails, password: text })}
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setStudentDetails({ ...studentDetails, confirmPassword: text })}
          placeholder='Confirm Password'
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setStudentDetails({ ...studentDetails, mobileNo: text })}
          placeholder='Mobile Number'
          style={styles.input}
        />
        <Pressable style={styles.btn} onPress={() => handleSubmit()}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 18 }}>Already a User? <Text style={styles.signup} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
    </LinearGradient>
  );
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
        color:'white',
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
        borderColor: '#666666', 
        fontWeight:'bold',
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 5,
        textAlign:'center',
        borderRadius:20
    },
    btn:{
      backgroundColor:'#663300',
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