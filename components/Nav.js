import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';

const Nav = () => {
  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'lightblue',
    borderTopWidth: 1,
    backgroundColor:'wheat'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    margin:15,
    borderRadius:10
  },
  tabText: {
    fontSize: 16,
  },
});

export default Nav;
