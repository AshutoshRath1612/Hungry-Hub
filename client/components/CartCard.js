import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useCart } from '../CartContext'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

export default function CartCard() {
    const { cart } = useCart()
    const navigation = useNavigation()
  return (
    <>
    {cart.length !== 0 ? (<View style={styles.cartview}>
        <Text style={styles.text}>{cart[0].items.length} {cart[0].items.length === 1 ? 'item' : 'items'} added</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cart")}><Text style={{fontSize:RFValue(13) , fontWeight:'bold'}}>
          View Cart
        </Text></TouchableOpacity>
      </View>) : null}
    </>
  )
}

const styles = StyleSheet.create({
    cartview:{
        width:'90%',
        backgroundColor:'#915858',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:10,
        marginHorizontal:'5%',
        height:'8%',
        position:'absolute',
        bottom:10
      },
      text:{
        fontSize:RFValue(15),
        color:'white',
        fontWeight:'bold'
      },
      button:{
        backgroundColor:'white',
        padding:10,
        borderRadius:5
      }
})