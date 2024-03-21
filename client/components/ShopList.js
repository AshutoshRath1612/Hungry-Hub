import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React from 'react'


export default function ShopList() {
        
const DATA = [
    { id: '1', title: 'Card 1' },
    { id: '2', title: 'Card 2' },
    { id: '3', title: 'Card 3' },
    { id: '4', title: 'Card 4' },
    { id: '5', title: 'Card 5' },
  ];

  const CardItem = ({title}) =>{
    return (
        <View style={styles.card}>
        <Text>{title}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Shops</Text>
      <FlatList 
        data={DATA}
        renderItem={({ item }) => <CardItem title={item.title} />}
        showsVerticalScrollIndicator={false}
         keyExtractor={item => item.id}
      />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-start',
        padding:10,
        marginBottom:0
    },
    card: {
        width: 350,
        height: 150,
        backgroundColor: 'lightblue',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title:{
        fontSize:25,
        marginLeft:10,
        fontFamily:'Ubuntu_700Bold'
    }
})