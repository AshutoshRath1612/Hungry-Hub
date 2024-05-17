import { View, Text,StatusBar, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import RazorpayCheckout from 'react-native-razorpay'
import AsyncStorage from '@react-native-async-storage/async-storage';

const createOrder = async (amount) => {
    const response = await fetch('http://192.168.29.15:8080/create_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    console.log(data)
    return data;
};


export default function Payment({navigation,route}) {
    const [orderID, setOrderID] = useState(null);
    const [user,setUser] = useState(null);
    const { amount } = route.params;

    useEffect(()=>{
        const getUser = async () => {
            var user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            setUser(user);
        }
        getUser();
    })

    const initiatePayment = async () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: '', // Your api key
            amount: amount,
            name: 'foo', 
            prefill: {
              email: 'void@razorpay.com',
              contact: user.mobileNo,
              name: 'Razorpay Software',
            },
            theme: {color: '#59a0f7',backdrop_color:'#f7f7f7'},
          };
        try {
            const orderID = await createOrder(amount * 100); // Convert amount to paise
            setOrderID(orderID);
            console.log(orderID)
            RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              console.log(data)
              alert(`Success: ${data}`);
            })
            .catch(error => {
              // handle failure
              console.log(error)
              alert(`Error: ${error}`);
            });
        } catch (error) {
            console.error('Failed to create order:', error);
            Alert.alert('Error', 'Failed to create order. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Initiate Payment" onPress={initiatePayment} />
        </View>
    );
}
