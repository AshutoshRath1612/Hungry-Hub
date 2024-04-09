// Cart.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useCart } from "../../CartContext";

const Cart = () => {
  const { cartState, dispatch } = useCart();

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <TouchableOpacity onPress={() => removeItem(item)}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Cart</Text>
      <FlatList
        data={cartState.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Cart;
