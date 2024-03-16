import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './components/nav/Nav';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <View style={styles.container}>
    <LandingPage />
    {/* <Nav /> */}
      {/* <Text style={styles.text}>Hello</Text>
      <StatusBar style="auto" />
      <View>
        <Text style={{color:'white'}}>This is a text in the view.</Text>
      </View> */}
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
