import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

export default function OTP() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = Array(6).fill(0).map((_, i) => useRef(null));

  const focusNext = (index) => {
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      animateInput(index);
      focusNext(index);
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === '') {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      animateBack(index);
      inputs[index - 1].current.focus();
    }
  };

  const animateBack = (index) => {
    if (index === 0) return;
    inputs[index].current.setNativeProps({
      style: { borderBottomWidth: 0 },
    });
  };

  const animateInput = (index) => {
    if (index >= otp.length - 1) {
      return;
    }
    inputs[index + 1].current.setNativeProps({
      style: { borderBottomWidth: 1 },
    });
  };

  const handleSubmit = () => {
    // Your submit logic here
  };

  return (
    <LinearGradient colors={['#DFF5FF', '#5356FF']} style={styles.OTPcontainer}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Enter the code sent to</Text>
        <Text style={[styles.titleText , {fontWeight:'bold'}]}>9348183170</Text>
      </View>
      <View style={styles.inputContainer}>
        {inputs.map((input, index) => (
          <TextInput
            ref={input}
            key={index}
            style={[styles.input, { borderBottomWidth: index === 0 ? 1 : 0 }]}
            maxLength={1}
            keyboardType="number-pad"
            value={otp[index]}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <Pressable ><Text  style={styles.resendText}>Resend code</Text></Pressable>
      <View style={{alignItems:'center' ,width:'100%'}}>
      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  OTPcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    alignItems:'center'
  },
  titleText: {
    color: '#003366', // Dark Blue
    fontSize: RFValue(23),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#378CE7', // Light Blue
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
    color: '#003366', // Dark Blue
  },
  resendText: {
    color: '#003366', // Light Blue
    marginBottom: 20,
    marginHorizontal:'10%',
    textAlign:'right',
    fontWeight:'bold',
  },
  submitButton: {
    backgroundColor: '#003366',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width:'40%',
    alignItems:'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
