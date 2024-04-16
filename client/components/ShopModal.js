import React from 'react';
import { View, Text, Modal, Button } from 'react-native';
import { useCart } from '../CartContext';

const ShopModal = ({data,shopName, visible, onClose }) => {
    const {dispatch}  = useCart()
    
    const replaceItem = () => {
        dispatch({
            type:'CLEAR_CART'
        })
        dispatch({
            type: 'ADD_TO_CART',
            payload: data
        })
        onClose()
        }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>Replace items added in the cart from {shopName}?</Text>
          <View style={{ height: 10 }} />
          <Button title="Close" onPress={onClose} />
          <Button title="Replace" onPress={()=>{replaceItem()}} />
          </View>
      </View>
    </Modal>
  );
};

export default ShopModal;
