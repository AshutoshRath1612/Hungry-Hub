import React, { useEffect,useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';

import { CartProvider } from './CartContext';
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
import { OrderStatusProvider } from './OrderStatusContext';
import VendorHome from './pages/Vendor/VendorHome';
import Menu from './pages/Vendor/Menu';
import History from './pages/Vendor/History';
import VendorOrderSummary from './pages/Vendor/VendorOrderSummary';
import AddFood from './pages/Vendor/AddFood';
import Scanner from './pages/Vendor/Scanner';
import OTP from './pages/OTP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular
  });

  const [initialRouteName, setInitialRouteName] = useState('Loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (!fontsLoaded) {
    return (
      <View style={styles.center}>
        <LottieView
          source={require('./assets/icons/acceptedicon.json')} // Replace with your animation file
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
          <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName= {initialRouteName} >
            <Stack.Screen name='Landing' component={LandingPage} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Choose User' component={ChooseUser} />
            <Stack.Screen name='OTP' component={OTP} />
            {/* For Student */}
            <Stack.Screen name='Student Signup' component={StudentSignUp} />
            <Stack.Screen name='Student Home' component={StudentHome} />
            <Stack.Screen options={{headerShown:true}} name='History' component={OrderHistory} />
            <Stack.Screen options={{headerShown:true}} name='Order Summary' component={OrderSummary} />
            <Stack.Screen options={{headerShown:true}} name='Cart' component={Cart} />
            <Stack.Screen name='Shop Menu' component={ShopMenu} options={({ route }) => ({  headerShown: true, title: route.params.shopName })} />
            <Stack.Screen name='Search Result' component={SearchResults} options={({ route }) => ({  headerShown: true, title: route.params.itemName })} />
            <Stack.Screen name='Payment Success' component={OrderSuccessScreen} />
            
            {/* For vendor */}
            <Stack.Screen name='Vendor Signup' component={VendorSignUp} />
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
    height:'100%',
    width:'100%'
  },
  center: {
    justifyContent:'center',
    alignItems:'center'
  }
});