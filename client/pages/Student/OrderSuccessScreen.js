import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import failedanimation from '../../assets/failed.json';
import { RFValue } from 'react-native-responsive-fontsize';

const OrderSuccessScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [isSuccess , setIsSuccess] = useState(false);
  
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{flex:1,  alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          width: RFValue(300),
          height: RFValue(200),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSuccess===true ?
           ( 
            <>
            <LottieView
          source={require('../../assets/successful.json')} // Replace 'animation.json' with your Lottie animation file
          autoPlay
          loop={false}
          speed={1}
          style={{ width: RFValue(500), height: RFValue(500) }}
        />
        <Text style={{ fontSize: RFValue(30), fontWeight:'bold',marginBottom: 20 }}>Order Placed Successfully</Text>
        </>
        )
        :(
            <View style={{alignItems:'center',width:RFValue(400),height:RFValue(400)}}>
            <LottieView
          source={require('../../assets/failed.json')} // Replace 'animation.json' with your Lottie animation file
          autoPlay
          loop={false}
          speed={0.5}
          resizeMode='cover'
          style={{ width: '100%', height: '100%' }}
        />
        <Text style={{ fontSize: RFValue(30), fontWeight:'bold',marginBottom: 20 }}>Order Failed</Text>
        </View>
        )}
      </Animated.View>
    </View>
  );
};

export default OrderSuccessScreen;
