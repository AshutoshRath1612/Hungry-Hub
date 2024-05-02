import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import failedanimation from "../../assets/icons/failed.json";
import { RFValue } from "react-native-responsive-fontsize";

const OrderSuccessScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    if(isSuccess === true){
    setTimeout(()=>{
      navigation.navigate('Student Home')
    },4000)
  }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
            <LottieView
              source={require("../../assets/icons/successful.json")} // Replace 'animation.json' with your Lottie animation file
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
              source={require("../../assets/icons/failed.json")} // Replace 'animation.json' with your Lottie animation file
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
    </View>
  );
};

export default OrderSuccessScreen;
