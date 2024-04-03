import React, { useEffect } from 'react';
import { StyleSheet, View ,Text,FlatList, Image} from 'react-native';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationContext } from '../../NavContext';
import { RFValue } from 'react-native-responsive-fontsize';

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
    date: new Date().toDateString(),
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
    date: new Date().toLocaleDateString('en-GB' , {timeZone: 'UTC'}),
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
    date: new Date().toDateString().replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>'),
    status: 'Delivered',
    time: new Date().toLocaleTimeString(),
  },
]

function formatDate(date) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  return formattedDate.replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>');
}


const CardItem = ({ item }) => {
  return (
    <View style={styles.items}>
    <View style={styles.itemHeader}>
    <Image style={{height:RFValue(50) , width:RFValue(50)}} resizeMode='contain' source={require("../../assets/Logo.png")} />
    <View>
      <Text>{item.storeName}</Text>
    </View>
    <Text>{item.status}</Text>
    </View>
      <FlatList
        data={item.items}
        style={styles.itemList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.quantity} x {item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.item}>
        <Text>{item.date} at {item.time}</Text>
      </View>
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
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  item: {
    paddingVertical: 5,
  },
  itemList: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyContainer: {
    flex: 1,
    width: '100%',
    marginBottom: RFValue(55), // Add padding to prevent overlap with navigation bar
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
