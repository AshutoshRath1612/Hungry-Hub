import { View, Text, FlatList,StyleSheet } from 'react-native'
import React from 'react'

export default function Reccomandation() {
    
const DATA = [
    { id: '1', title: 'Card 1' },
    { id: '2', title: 'Card 2' },
    { id: '3', title: 'Card 3' },
    { id: '4', title: 'Card 4' },
    { id: '5', title: 'Card 5' },
  ];

  const CardItem = ({ title }) => {
    return (
      <View style={styles.card}>
        <Text>{title}</Text>
      </View>
    );
  };

  return (
    <View 
    style={styles.reccomandation}>
        <Text style={styles.title}>Recommended for you</Text>
      <FlatList
      horizontal
      
      keyboardShouldPersistTaps='handled'
      data={DATA}
      renderItem={({ item }) => <CardItem title={item.title} />}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    reccomandation:{
        overflow:'hidden',
        height:200,
        alignItems: 'flex-start',
    },
    card: {
      width: 200,
      height: 200,
      backgroundColor: 'lightblue',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title:{
        fontSize:25,
        marginLeft:15,
        fontFamily:'Ubuntu_700Bold'
    }
  });