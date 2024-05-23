import { View, Text, StatusBar, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Host } from '../../Constants';

const createOrder = async (amount) => {
    const order = {
        amount: amount * 100, // Convert amount to paise
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: 1
    };
    try {
        const response = await fetch(`${Host}order/create_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export default function Payment({ navigation, route }) {
    const [orderID, setOrderID] = useState(null);
    const [user, setUser] = useState(null);
    const { amount } = route.params;

    useEffect(() => {
        const getUser = async () => {
            var user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            setUser(user);
        };
        getUser();
    }, []);
    // {"code": 0, "description": "{\"error\":{\"code\":\"BAD_REQUEST_ERROR\",\"description\":\"You may have cancelled the payment or there was a delay in response from the UPI app\",\"source\":\"customer\",\"step\":\"payment_authentication\",\"reason\":\"payment_cancelled\",\"metadata\":{}}}", "error": {"code": "BAD_REQUEST_ERROR", "description": "You may have cancelled the payment or there was a delay in response from the UPI app", "metadata": {}, "reason": "payment_cancelled", "source": "customer", "step": "payment_authentication"}}
    const initiatePayment = async () => {
        try {
            const orderData = await createOrder(amount); // Create order and get order ID
            setOrderID(orderData.id);

            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: '', // Your api key
                amount: amount * 100, // Convert to paise
                name: 'foo',
                order_id: orderData.id, // Include order ID
                prefill: {
                    email: user.email,
                    contact: user.mobileNo,
                    name: user.name,
                },
                theme: { color: '#59a0f7', backdrop_color: '#f7f7f7' },
            };

            RazorpayCheckout.open(options)
                .then(data => {
                    // handle success
                    console.log(data);
                    alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch(error => {
                    // handle failure
                    console.log(error);
                    alert(`Error: ${error.description}`);
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
