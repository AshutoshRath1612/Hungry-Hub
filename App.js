import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './components/nav/Nav';
import LandingPage from './pages/LandingPage';
import { useFonts, Ubuntu_700Bold ,Ubuntu_500Medium} from '@expo-google-fonts/ubuntu';

export function FontLoader() {
  let [fontsLoaded, fontError] = useFonts({
    Ubuntu_700Bold,Ubuntu_500Medium
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return true;
}
export default function App() {

  return (
    <View style={styles.container}>
    <LandingPage />
    </View>
  ); 
  }
  
  const styles = StyleSheet.create({
    container: {
    
  },
  text:{
    // color:'white'
  }
});
