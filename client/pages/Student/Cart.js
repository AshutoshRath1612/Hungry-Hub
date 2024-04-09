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

  console.log(cartState)
  // Check if cartState exists before accessing cartState.items
  return (
    <View style={styles.container}>
      <Text>Cart</Text>
      {cartState && (
        <FlatList
          data={cartState.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default Cart;
