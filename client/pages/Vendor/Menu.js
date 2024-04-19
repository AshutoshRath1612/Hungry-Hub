import { View, Text } from 'react-native'
import React from 'react'
import Nav from '../../components/Nav'
import { NavigationContext } from '../../NavContext'

export default function Menu({navigation, route}) {
  return (
    <NavigationContext.Provider value={{ navigation, route }}>
    <View>
      <Text>Menu</Text>
      <Nav />
    </View>
    </NavigationContext.Provider>
  )
}