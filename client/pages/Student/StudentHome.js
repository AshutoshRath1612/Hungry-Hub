import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Nav from "../../components/Nav";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Reccomandation from "../../components/Reccomandation";
import ShopList from "../../components/ShopList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContext } from "../../NavContext";
import { RFValue } from "react-native-responsive-fontsize";

export default function StudentHome() {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <NavigationContext.Provider value={{ navigation, route }}>
        <View style={styles.top}>
          <Header />
          <Search />
        </View>
        <View style={styles.bottom}>
          <Reccomandation />
          <ShopList />
        </View>
        <View style={styles.nav}>
          <Nav navigation={navigation} currentRoute={route.name} />
        </View>
      </NavigationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // justifyContent: "space-between",
    // backgroundColor:'#001d07'
  },
  top: {
    height: "20%",
    justifyContent: "space-between",
  },
  bottom: {
    height: "73%",
    paddingVertical: 10,
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
