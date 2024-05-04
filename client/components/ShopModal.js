import React from 'react';
import { View, Text, Modal, Button, StyleSheet, Pressable } from 'react-native';
import { useCart } from '../CartContext';
import { RFValue } from 'react-native-responsive-fontsize';

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
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.containerView}>
          <Text style={{fontSize:RFValue(15) , fontWeight:'500'}}>Replace items added in the cart from {shopName}?</Text>
          <View style={styles.btnView}>
          <Pressable style={styles.btn} onPress={onClose} ><Text style={styles.txt}>Close</Text></Pressable>
          <Pressable style={styles.btn}  onPress={()=>{replaceItem()}}><Text style={styles.txt}>Replace</Text></Pressable>
          </View>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
  },
  containerView:{
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10,
    width: '80%'
  },
  btnView:{
    width:'100%',
    justifyContent:'space-between',
    flexDirection:'row',
    marginVertical:10,
  },
  btn:{
    width:'40%',
    marginHorizontal:'2.5%',
    padding:10,
    alignItems:'center',
    borderRadius:5,
    backgroundColor:'#3262A2'

  },
  txt:{
    color:'white',
    fontWeight:'bold',
    fontSize:RFValue(12)
  }
})

export default ShopModal;
