import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Search from '../../components/Search'

export default function SearchResults({route}) {
    const DATA = [
        {
            shopName: 'Shop 1',
            results: [
                {
                    id: 1,
                    name: 'Item 1',
                    rating: 4.5,
                    ratingCount: 100,
                    type: 'Vegeterian',
                    price: 100,
                },
                {
                    id: 2,
                    name: 'Item 2',
                    rating: 4.0,
                    ratingCount: 50,
                    type: 'Non-Vegeterian',
                    price: 200,
                },
               {
                    id: 3,
                    name: 'Item 3',
                    rating: 4.5,
                    ratingCount: 100,
                    type: 'Vegeterian',
                    price: 100,
                },
                {
                    id: 4,
                    name: 'Item 4',
                    rating: 4.0,
                    ratingCount: 50,
                    type: 'Non-Vegeterian',
                    price: 200,
                },
            ],
        },
        {
            shopName: 'Shop 2',
            results: [
                {
                    id: 5,
                    name: 'Item 5',
                    rating: 4.5,
                    ratingCount: 100,
                    type: 'Vegeterian',
                    price: 100,
                },
                {
                    id: 6,
                    name: 'Item 6',
                    rating: 4.0,
                    ratingCount: 50,
                    type: 'Non-Vegeterian',
                    price: 200,
                },
            ],
        },
        {
            shopName: 'Shop 3',
            results: [
                {
                    id: 7,
                    name: 'Item 7',
                    rating: 4.5,
                    ratingCount: 100,
                    type: 'Vegeterian',
                    price: 100,
                },
                {
                    id: 8,
                    name: 'Item 8',
                    rating: 4.0,
                    ratingCount: 50,
                    type: 'Non-Vegeterian',
                    price: 200,
                },
            ],
        },
    ]
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