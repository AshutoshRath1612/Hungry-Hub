import React, { useEffect } from 'react';
import { StyleSheet, View ,Text,FlatList, Image} from 'react-native';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationContext } from '../../NavContext';

export default function OrderHistory() {

  const DATA = [
    {
      _id:1,
    storeName: 'Store Name 1',
    orderId:'Order Name 1',
    items:[
      {name:'Item Name 1',quantity:1,price:10},
      {name:'Item Name 2',quantity:2,price:100},
      {name:'Item Name 3',quantity:3,price:10},
      {name:'Item Name 4',quantity:4,price:100},
    ],
    date: new Date().toLocaleDateString(),
    status: 'Delivered',
    time: new Date().toLocaleTimeString(),
  },
    {
      _id:2,
    storeName: 'Store Name 2',
    orderId:'Order Name 2',
    items:[
      {name:'Item Name 1',quantity:1,price:10},
      {name:'Item Name 2',quantity:2,price:100},
      {name:'Item Name 3',quantity:3,price:10},
      {name:'Item Name 4',quantity:4,price:100},
    ],
    date: new Date().toLocaleDateString(),
    status: 'Delivered',
    time: new Date().toLocaleTimeString(),
  },
    {
      _id:3,
    storeName: 'Store Name 3',
    orderId:'Order id 3',
    items:[
      {name:'Item Name 1',quantity:1,price:10},
      {name:'Item Name 2',quantity:2,price:100},
      {name:'Item Name 3',quantity:3,price:10},
      {name:'Item Name 4',quantity:4,price:100},
    ],
    date: new Date().toLocaleDateString(),
    status: 'Delivered',
    time: new Date().toLocaleTimeString(),
  },
    {
      _id:4,
    storeName: 'Store Name 4',
    orderId:'Order id 4',
    items:[
      {name:'Item Name 1',quantity:1,price:10},
      {name:'Item Name 2',quantity:2,price:100},
      {name:'Item Name 3',quantity:3,price:10},
      {name:'Item Name 4',quantity:4,price:100},
    ],
    date: new Date().toLocaleDateString(),
    status: 'Delivered',
    time: new Date().toLocaleTimeString(),
  },
    {
      _id:5,
    storeName: 'Store Name 5',
    orderId:'Order id 5',
    items:[
      {name:'Item Name 1',quantity:1,price:10},
      {name:'Item Name 2',quantity:2,price:100},
      {name:'Item Name 3',quantity:3,price:10},
      {name:'Item Name 4',quantity:4,price:100},
    ],
    date: new Date().toLocaleDateString(),
    status: 'Delivered',
    time: new Date().toLocaleTimeString(),
  },
]
const CardItem = ({ item }) => {
  return (
    <View style={styles.items}>
    <View>
    <Image source={require("../../assets/Logo.png")} />
    <View>
      <Text>Store Name: {item.storeName}</Text>
      
    </View>
    <Text>{item.status}</Text>
    </View>
      <Text>Order ID: {item.orderId}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Time: {item.time}</Text>
      <FlatList
        data={item.items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const navigation = useNavigation();
const route = useRoute();
return (
  <View style={styles.container}>
    <NavigationContext.Provider value={{ navigation, route }}>
      <FlatList
        style={styles.historyContainer}
        data={DATA}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={item => item._id.toString()}
      />
      <View style={styles.nav}>
        <Nav navigation={navigation} currentRoute={route.name} />
      </View>
    </NavigationContext.Provider>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
items: {
  backgroundColor: 'white',
  marginVertical: 10,
  marginHorizontal: 10,
  borderRadius: 10,
  padding: 10,
},
item: {
  paddingVertical: 5,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
historyContainer: {
  flex: 1,
  width: '100%',
},
nav: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
},
});