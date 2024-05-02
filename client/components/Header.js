import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.title}>HungerHub</Text>
        </View>
        <View style={styles.profile}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.profileImage}
            resizeMode="contain"
          ></Image>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "15%",
      },
      headerLeft: {
        alignItems: "flex-end",
        flexDirection: "row",
      },
      logo: {
        height: 50,
        width: 100,
      },
      title: {
        fontSize: 25,
        fontWeight: "bold",
      },
      profile: {
        borderWidth: 1,
        borderRadius: 30,
        marginRight: 20,
      },
      profileImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
      },
})