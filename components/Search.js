import { View, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function Search() {
  return (

      <View style={styles.searchView}>
      <View style={styles.searchBox}>
        <FontAwesome name="search" size={20} color="orange" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Find Your Food..."
          placeholderTextColor="gray"
        />
      </View>
      <FontAwesome style={{padding:8,borderRadius:5}} color='orange' name="filter" size={30} />
      </View>
  )
}

const styles = StyleSheet.create({
      searchView:{
        alignItems:'center',
        flexDirection:'row' , 
        justifyContent:'space-evenly'
      },
      searchBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 9,
        backgroundColor: "white",
        width: "70%",
        height:40
      },
      icon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        fontSize: 16,
        textAlign: "center",
        color: "black",
      },
})