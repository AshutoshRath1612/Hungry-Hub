import { View, Text } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';

export default function QRcode() {

    const logo = require('../assets/Logo.png')
  return (
    <View style={{justifyContent:'center',alignContent:'center'}}>
       <QRCode
      value="Just some string value"
      logo={logo}
      logoSize={30}
      logoBackgroundColor='transparent'
    />
    </View>
  )
}