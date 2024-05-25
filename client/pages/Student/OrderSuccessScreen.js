import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity, BackHandler } from "react-native";
import LottieView from "lottie-react-native";
import { useFocusEffect } from '@react-navigation/native';
import failedanimation from "../../assets/icons/failed.json";
import { RFValue } from "react-native-responsive-fontsize";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AddOrderRotue, Host } from "../../Constants";

const OrderSuccessScreen = ({ navigation,route }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [isSuccess, setIsSuccess] = useState(route.params.isSuccess);
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    if(isSuccess === true){
      setTimeout(()=>{
        handleAddOrder();
      },4000);
    }
  }, [isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Cart');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  const handleAddOrder = async() => {
    const { order, payment, user, cartData } = route.params.data;
    fetch(`${Host}${AddOrderRotue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ order, payment, cartData, user })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // if(data.success === true){
      //   navigation.navigate('Student Home')
      // }
    })
  }

  return (
    <LinearGradient colors={['#F6C8C7' , "white"]} style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          width: RFValue(300),
          height: RFValue(200),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSuccess === true ? (
          <>
          <StatusBar backgroundColor='#F6C8C7'barStyle='dark-content' showHideTransition='fade' />
            <LottieView
              source={require("../../assets/icons/successful.json")}
              autoPlay
              loop={false}
              speed={1}
              style={{ width: RFValue(500), height: RFValue(500) }}
            />
            <Text
              style={{
                fontSize: RFValue(30),
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Order Placed Successfully
            </Text>
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              width: RFValue(400),
              height: RFValue(400),
            }}
          >
            <LottieView
              source={require("../../assets/icons/failed.json")}
              autoPlay
              loop={false}
              speed={0.5}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
            <Text
              style={{
                fontSize: RFValue(30),
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Order Failed
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{
                borderWidth: 2,
                borderRadius: 20,
                padding: 10,
                borderColor: "red",
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(20),
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

export default OrderSuccessScreen;
