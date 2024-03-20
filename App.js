import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './pages/LandingPage';
import { useFonts, Ubuntu_700Bold ,Ubuntu_500Medium, Ubuntu_400Regular} from '@expo-google-fonts/ubuntu';
import ChooseUser from './pages/ChooseUser';
import Login from './pages/Login';
import VendorSignUp from './pages/Vendor/VendorSignUp';
import StudentSignUp from './pages/Student/StudentSignUp';
import StudentHome from './pages/Student/StudentHome';

export function FontLoader() {
  let [fontsLoaded, fontError] = useFonts({
    Ubuntu_700Bold,Ubuntu_500Medium,Ubuntu_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return true;
}

const Stack = createStackNavigator();

export default function App() {
  const loader = FontLoader()
  if(!loader)
   return null
  return (
    <NavigationContainer>
    {/* <LandingPage /> */}
    <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='Landing'>
    <Stack.Screen name='Landing' component={LandingPage}></Stack.Screen>
    <Stack.Screen name='Login' component={Login}></Stack.Screen>
    <Stack.Screen name='Choose User' component={ChooseUser}></Stack.Screen>

    {/* For Student */}
    <Stack.Screen name='Student Signup' component={StudentSignUp}></Stack.Screen>
    <Stack.Screen name='Student Home' component={StudentHome}></Stack.Screen>

    {/* For vendor */}
    <Stack.Screen name='Vendor Signup' component={VendorSignUp}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  ); 
  }
  const styles = StyleSheet.create({
    container: {
    
  },
  text:{
    // color:'white'
  }
});
