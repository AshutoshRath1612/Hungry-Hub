import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PrintDetails from '../../components/PrintDetails';

export default function OrderSummary() {
  const VegLogo = require('../../assets/VegLogo.png');
  const NonVegLogo = require('../../assets/NonVegLogo.png');
  const route = useRoute();
  const summary = route.params.item;

  const findPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <View style={styles.OrderSummaryContainer}>
      <Text style={styles.shopName}>{summary.storeName}</Text>
      <View style={styles.line}></View>
      <Text>{summary.status === 'Baking' ? 'This Order is Being Baked' : `This Order was ${summary.status}`}</Text>
      <Text>Your Order</Text>
      <FlatList
        data={summary.items}
        style={styles.itemList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemname}>
            <Image style={styles.typeImg} source={item.type === 'Vegeterian' ? VegLogo : NonVegLogo} />
            <Text>{item.name}</Text>
            </View>
            <View style={styles.iteminfo}>
              <Text>{item.quantity} X {item.price}</Text>
            <Text>Total: {item.price * item.quantity}</Text>
            </View>
            <View style={styles.line}></View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View>
        <Text>Item Total</Text>
        <Text>{findPrice(summary.items)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  OrderSummaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'grey',
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemList: {
    marginTop: 20,
    width:'100%',
  },
  item: {
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemname:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  iteminfo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  typeImg:{
    height: 15,
    width: 15,
    marginRight: 10,
  }
});
