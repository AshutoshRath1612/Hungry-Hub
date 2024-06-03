import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";
import { RFValue } from 'react-native-responsive-fontsize';

import { CartProvider } from './CartContext';
import { OrderStatusProvider } from './OrderStatusContext';

import LandingPage from './pages/LandingPage';
import ChooseUser from './pages/ChooseUser';
import Login from './pages/Login';
import VendorSignUp from './pages/Vendor/VendorSignUp';
import StudentSignUp from './pages/Student/StudentSignUp';
import StudentHome from './pages/Student/StudentHome';
import OrderHistory from './pages/Student/OrderHistory';
import OrderSummary from './pages/Student/OrderSummary';
import ShopMenu from './pages/Student/ShopMenu';
import Cart from './pages/Student/Cart';
import SearchResults from './pages/Student/SearchResults';
import OrderSuccessScreen from './pages/Student/OrderSuccessScreen';
import VendorHome from './pages/Vendor/VendorHome';
import Menu from './pages/Vendor/Menu';
import History from './pages/Vendor/History';
import VendorOrderSummary from './pages/Vendor/VendorOrderSummary';
import AddFood from './pages/Vendor/AddFood';
import Scanner from './pages/Vendor/Scanner';
import OTP from './pages/OTP';
import Payment from './pages/Student/Payment';
import VendorUID from './pages/Vendor/VendorUID';
import Profile from './pages/Profile';
import { Host, SaveTokenRoute } from './Constants';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular
  });

  const [initialRouteName, setInitialRouteName] = useState('Loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerForPushNotificationsAsync();
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const loggedIn = await isLoggedIn();
    const student = await isStudentLogin();
    if (loggedIn) {
      if (student) {
        setInitialRouteName('Student Home');
      } else {
        setInitialRouteName('Vendor Home');
      }
    } else {
      setInitialRouteName('Login');
    }
    setLoading(false);
  };

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  };

  const isStudentLogin = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    return user !== null && user.isStudent;
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

      // Save the token to your server
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      console.log(user)
      if (user) {
        await fetch(`${Host}${SaveTokenRoute}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user._id, expoPushToken: token , isStudent:user.isStudent }),
        });
      }
    // } else {
    //   alert('Must use physical device for Push Notifications');
    // }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.center}>
        <LottieView
          source={require('./assets/icons/Loading.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CartProvider>
        <OrderStatusProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Choose User' component={ChooseUser} />
              <Stack.Screen name='OTP' component={OTP} />
              <Stack.Screen name='Profile' component={Profile} />
              <Stack.Screen name='Student Signup' component={StudentSignUp} />
              <Stack.Screen name='Student Home' component={StudentHome} />
              <Stack.Screen name='History' component={OrderHistory} options={{ headerShown: true }} />
              <Stack.Screen name='Order Summary' component={OrderSummary} options={{ headerShown: true, headerStyle: { backgroundColor: '#E0A2A2' }, headerTintColor: 'black', headerTitleStyle: { fontSize: RFValue(23) } }} />
              <Stack.Screen name='Cart' component={Cart} options={{ headerShown: true }} />
              <Stack.Screen name='Shop Menu' component={ShopMenu} options={({ route }) => ({ headerShown: true, title: route.params.shopName })} />
              <Stack.Screen name='Search Result' component={SearchResults} options={({ route }) => ({ headerShown: true, title: route.params.itemName })} />
              <Stack.Screen name='Payment' component={Payment} />
              <Stack.Screen name='Payment Success' component={OrderSuccessScreen} />
              <Stack.Screen name='Vendor Signup' component={VendorSignUp} />
              <Stack.Screen name='VendorUID' component={VendorUID} />
              <Stack.Screen name='Vendor Home' component={VendorHome} />
              <Stack.Screen name='Vendor Menu' component={Menu} />
              <Stack.Screen name='Vendor History' component={History} />
              <Stack.Screen name='Vendor Order Summary' component={VendorOrderSummary} />
              <Stack.Screen name='Add Food' component={AddFood} />
              <Stack.Screen name='Scanner' component={Scanner} />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderStatusProvider>
      </CartProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
