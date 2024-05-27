import { View, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateOrderRoute, Host } from '../../Constants';
import LottieView from 'lottie-react-native';

const createOrder = async (amount) => {
    const order = {
        amount: amount * 100, // Convert amount to paise
        currency: 'INR',
        payment_capture: 1
    };
    try {
        const response = await fetch(`${Host}${CreateOrderRoute}`, {
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
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [payment, setPayment] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    const { amount } = route.params.cartData;

    useEffect(() => {
        const getUser = async () => {
            var user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            setUser(user);
            initiatePayment(user);
        };
        getUser();
    }, []);

    const initiatePayment = async (user) => {
        try {
            const orderData = await createOrder(amount); // Create order and get order ID
            setOrder(orderData);

            var options = {
                description: 'Credits towards consultation',
                image: '../../assets/images/Logo.png',
                currency: 'INR',
                key: 'rzp_test_1iMLg2obI6ZsN0', // Your api key
                amount: amount * 100, // Convert to paise
                name: user.name != null ? user.name : user.regdNo,
                order_id: orderData.id, // Include order ID
                prefill: {
                    email: user.email,
                    contact: user.mobileNo,
                    name: user.name != null ? user.name : user.regdNo,
                },
                theme: { color: '#59a0f7', backdrop_color: '#f7f7f7' },
            };

            RazorpayCheckout.open(options)
                .then(data => {
                    // handle success
                    console.log(data);
                    setIsSuccess(true);
                    setPayment(data);
                    // Show success animation and navigate after a delay
                    setTimeout(() => {
                        navigation.navigate('Payment Success', {  data: {
                            order: orderData,
                            payment: data,
                            user: user,
                            cartData: route.params.cartData
                        } });
                    }, 4000);
                })
                .catch(error => {
                    // handle failure
                    console.log(error);
                    setIsSuccess(false);
                    setPayment(error);
                    // Show failed animation and navigate after a delay
                    setTimeout(() => {
                        navigation.navigate('Payment Success');
                    }, 4000);
                });
        } catch (error) {
            console.error('Failed to create order:', error);
            Alert.alert('Error', 'Failed to create order. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView 
                    source={require('../../assets/icons/Loading.json')} 
                    autoPlay 
                    loop 
                    style={{ width: 200, height: 200 }}
                />
        </View>
    );
}
