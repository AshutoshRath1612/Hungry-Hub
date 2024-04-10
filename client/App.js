import React from 'react';
import { ActivityIndicator,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import LandingPage from './pages/LandingPage';
import ChooseUser from './pages/ChooseUser';
import Login from './pages/Login';
import VendorSignUp from './pages/Vendor/VendorSignUp';
import { CartProvider } from './CartContext';
import StudentSignUp from './pages/Student/StudentSignUp';
import StudentHome from './pages/Student/StudentHome';
import OrderHistory from './pages/Student/OrderHistory';
import OrderSummary from './pages/Student/OrderSummary';
import ShopMenu from './pages/Student/ShopMenu';
import Cart from './pages/Student/Cart';
import Nav from './components/Nav'; // Import Nav component
import SearchResults from './pages/Student/SearchResults';

export function FontLoader() {
  let [fontsLoaded, fontError] = useFonts({
    Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular
  });

  if (fontError) {
    console.error("Font loading error: ", fontError);
    return 'error';
  }

  if (!fontsLoaded) {
    return 'loading';
  }

  return 'loaded';
}

const Stack = createStackNavigator();

export default function App() {
  const fontLoadStatus = FontLoader();

  if (fontLoadStatus === 'loading') {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (fontLoadStatus === 'error') {
    return <Text>Error loading fonts</Text>;
  }
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='Landing'>
          <Stack.Screen name='Landing' component={LandingPage}></Stack.Screen>
          <Stack.Screen name='Login' component={Login}></Stack.Screen>
          <Stack.Screen name='Choose User' component={ChooseUser}></Stack.Screen>

          {/* For Student */}
          <Stack.Screen name='Student Signup' component={StudentSignUp}></Stack.Screen>
          <Stack.Screen name='Student Home' component={StudentHome}></Stack.Screen>
          <Stack.Screen options={{headerShown:true}} name='History' component={OrderHistory}></Stack.Screen>
          <Stack.Screen options={{headerShown:true}} name='Order Summary' component={OrderSummary}></Stack.Screen>
          <Stack.Screen options={{headerShown:true}} name='Cart' component={Cart}></Stack.Screen>
          <Stack.Screen name='Shop Menu' component={ShopMenu} options={({ route }) => ({  headerShown: true, title: route.params.shopName })} />
          <Stack.Screen name='Search Result' component={SearchResults} options={({ route }) => ({  headerShown: true, title: route.params.itemName })} />

          {/* For vendor */}
          <Stack.Screen name='Vendor Signup' component={VendorSignUp}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Nav />  */}
    </CartProvider>
  ); 
}

const styles = StyleSheet.create({
  container: {

  },
  text: {
    // color:'white'
  }
});
