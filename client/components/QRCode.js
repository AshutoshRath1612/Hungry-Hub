import { View, Text } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { RFValue } from 'react-native-responsive-fontsize';

export default function QRcode({data}) {
    const logo = require('../assets/images/Logo.png')
  return (
    <View style={{justifyContent:'center',alignContent:'center',marginBottom:RFValue(15)}}>
       <QRCode
      value={data}
      logo={logo}
      logoSize={100}
      size={300}
      color='#C38888'
    />
    </View>
  )
}