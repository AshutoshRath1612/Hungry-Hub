import { View, Text } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { RFValue } from 'react-native-responsive-fontsize';

export default function QRcode({data}) {
    const logo = require('../assets/Logo.png')
    console.log(JSON.stringify(data))
  return (
    <View style={{justifyContent:'center',alignContent:'center',marginBottom:RFValue(15)}}>
       <QRCode
      value={"9348183170@ybl"}
      logo={logo}
      logoSize={30}
      size={200}
      logoBackgroundColor='transparent'
    />
    </View>
  )
}