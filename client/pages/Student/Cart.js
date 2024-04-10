import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from '../../CartContext';

export default function Cart() {
  const { cart, dispatch } = useCart();
  console.log(cart)

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.map(item => (
        <View key={item.name} style={styles.item}>
          <Text>{item.foodItem.name} - ${item.foodItem.price}</Text>
          <Button title="Remove" onPress={() => removeFromCart(item)} />
        </View>
      ))}
      <Button title="Clear Cart" onPress={clearCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '80%',
  },
});
