import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Search from '../../components/Search'

export default function SearchResults({route}) {
    console.log(route)
  return (
    <View>
        <View style={styles.searchBox}>
        <Search />
        </View>
      <Text>SearchResults</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    searchBox: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor:'grey',
        borderBottomWidth:2
    }
})