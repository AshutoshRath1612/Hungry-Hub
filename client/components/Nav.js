import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CartProvider, useCart } from '../CartContext';
import { NavigationContext } from '../NavContext';
import { RFValue } from 'react-native-responsive-fontsize';

function Nav() {
  const { route } = useContext(NavigationContext);
  // const route = useRoute()

  const {cart} = useCart()

  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <CartProvider>
    <View style={styles.navContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.tab, route.name === 'Student Home' && styles.selectedTab]}
          onPress={() => navigateToScreen('Student Home')}
        >
          <FontAwesome name='home' style={styles.tabText}></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, route.name === 'History' && styles.selectedTab]}
          onPress={() => navigateToScreen('History')}
        >
          <FontAwesome name='clock-o' style={styles.tabText}></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, route.name === 'Cart' && styles.selectedTab]}
          onPress={() => navigateToScreen('Cart')}
        >
        { cart.length!==0 ?(<View style={{position:'absolute' , left:'15%',zIndex:10,top:0 ,padding:5,paddingHorizontal:13, backgroundColor:'red',borderRadius:50}}>
          <Text style={{fontSize:RFValue(12) ,fontWeight:'bold' ,color:'white'}}>{cart[0].items.length}</Text>
        </View>) : <></>}
          <FontAwesome name='shopping-basket' style={styles.tabText}></FontAwesome>
        </TouchableOpacity>
      </View>
    </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
    padding: 5
  },
  tabText: {
    fontSize: 30,
  },
  selectedTab: {
    backgroundColor: 'lightgray',
  },
});

export default Nav;
