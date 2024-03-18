import { View, Text, StyleSheet, TextInput, Image,  Pressable} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';


const Login = ({navigation}) => {
    const [regdNo, setRegdNo] = useState('');
    const [password, setPassword] = useState('')
    const [focus,setFocus] = useState(false)
    const [focusPass,setFocusPass] = useState(false)

  const handleRegdChange = (inputText) => {
    setRegdNo(inputText);
    console.log(regdNo)
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
    console.log(password)
  };

  const changeFocus = () =>{
    setFocus(!focus)
  }

  const changeFocusPass = () =>{
    setFocusPass(!focusPass)
  }
  return (
    <LinearGradient colors={['lightblue','pink','violet']} style={styles.container}>
    <View style={styles.topic}>
    <Image style={styles.logo} resizeMode='contain' source={require('../assets/Logo.png')} />
      <Text style={styles.title}>Login</Text>
    </View>
    <View style={styles.form}>
      <TextInput
        onChangeText={handleRegdChange}
        value={regdNo}
        keyboardType='numeric'
        placeholder={focus ? '' :"UID"}
        style={styles.input}
        onFocus={changeFocus}
        onBlur={changeFocus}
      />
      <TextInput
      onChangeText={handlePasswordChange}
        placeholder={focusPass ? '' :"Password"}
        onFocus={changeFocusPass}
        onBlur={changeFocusPass}
        secureTextEntry={true}
        value={password}
        style={styles.input}
      />
      <Pressable style={styles.btn}><Text style={styles.btnText}>Login</Text></Pressable>
    </View>
    <Text style={{fontSize:18}}>Not a User? <Text style={styles.signup} onPress={()=>navigation.navigate('Choose User')}>Sign up</Text></Text>
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
        height:'30%',
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

export default Login