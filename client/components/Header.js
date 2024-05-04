import { View, Text, StyleSheet, Image, Modal } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome,Entypo } from "@expo/vector-icons";

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigation = useNavigation();
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing items from AsyncStorage:", error);
    }
  };
  const getCreds = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      setUserData(JSON.parse(user));
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowProfile = () => {
    getCreds();
    setModalVisible(true);
  };
  return (
    <View>
      <View style={styles.header}>
        <Button onPress={() => Logout()}>
          <Text>Press</Text>
        </Button>
        <View style={styles.headerLeft}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.title}>HungerHub</Text>
        </View>
        <View onTouchEnd={() => handleShowProfile()} style={styles.profile}>
          <Image
            source={require("../assets/icons/icon.png")}
            style={styles.profileImage}
            resizeMode="contain"
          ></Image>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          {userData && (
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
              <View style={{flexDirection:'row' , alignItems:'center'}}>

                <FontAwesome name="user" style={styles.userIcon} size={30} color="green" />
                <Text style={styles.modalText}>{userData.regdNo}</Text>
              </View>
                <Entypo name="cross"onPress={() => setModalVisible(false)}  size={24} color="green" />
              </View>
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
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
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  modalHeader:{
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    width:'100%',
    justifyContent:'space-between'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  userIcon:{
    height:'50%',
  }
});
