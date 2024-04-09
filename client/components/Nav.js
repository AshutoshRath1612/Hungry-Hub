import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContext } from '../NavContext';
import { CartProvider } from '../CartContext';

function Nav() {
  const { route } = useContext(NavigationContext);

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
