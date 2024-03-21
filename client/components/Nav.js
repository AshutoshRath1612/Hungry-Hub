import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';

const Nav = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    // Add navigation logic here to navigate to the corresponding screen
    console.log(selectedTab)
  };
  return (
    <View style={styles.navContainer}>
    <View style={styles.container}>
      <TouchableOpacity style={[styles.tab, selectedTab === 'Home' && styles.selectedTab]}
        onPress={() => handleTabPress('Home')}>
        <FontAwesome name='home' style={styles.tabText}></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, selectedTab === 'History' && styles.selectedTab]}
      onPress={() => handleTabPress('History')}>
        <FontAwesome name='clock-o' style={styles.tabText}></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, selectedTab === 'Cart' && styles.selectedTab]}
      onPress={() => handleTabPress('Cart')}>
        <FontAwesome name='shopping-basket' style={styles.tabText}></FontAwesome>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:0
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:20,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
    borderRadius:10,
    padding:5
  },
  tabText: {
    fontSize: 30,
  },
  selectedTab: {
    backgroundColor: 'lightgray',
  },
});

export default Nav;
