import { View, Text, StyleSheet, Image, Modal } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome,Entypo,MaterialCommunityIcons  } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

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
  const handleNavigate = () => {
    navigation.navigate("Profile", {userData});
    setModalVisible(false);
  }

  const getCreds = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      console.log(user)
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
        <View style={styles.headerLeft}>
          <Image
            style={styles.logo}
            source={require("../assets/images/HLogo.png")}
            resizeMode="contain"
          />
          <Text style={styles.title}>HungerHub</Text>
        </View>
        <View onTouchEnd={() => handleShowProfile()} style={styles.profile}>
          <Image
            source={require("../assets/images/User.png")}
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
              <View style={{flexDirection:'row' , alignItems:'center',justifyContent:'space-evenly', width:'70%',height:'100%'}}>
              <View>
                <FontAwesome name="user" size={40} color="#915858" /> 
              </View>
                <Text style={styles.modalText}>{userData.isStudent ? (userData.name !== undefined ? userData.name : userData.regdNo) : userData.username}</Text>
              </View>
                <Entypo name="cross"onPress={() => setModalVisible(false)}  size={30} color="#915858" />
              </View>
              <View style={styles.line} ></View>
              <View style={{height:'60%' , justifyContent:'space-around',width:'90%',alignItems:'flex-start'}}>
              <View style={styles.modalBody} onTouchEnd={()=>handleNavigate()}>
              <MaterialCommunityIcons name="card-account-details" size={26} color="#915858" />
              <Text style={styles.modalBodyText}>Account Details</Text>
              </View>
              <View style={styles.modalBody} onTouchEnd={()=>Logout()}>
              <MaterialCommunityIcons name="logout" size={26} color="#915858" />
              <Text style={styles.modalBodyText}>Logout</Text>
              </View>
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
    alignItems: "center",
  },
  headerLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    height: 70,
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
    height:'30%'
  },
  
  modalHeader:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    height:'40%',
    justifyContent:'space-between'
  },
  modalBody:{
    flexDirection:'row',
    alignItems:'center',
    width:'60%',
    justifyContent:'flex-start',
    marginVertical:'2%'
  },
  modalText: {
    fontWeight: "bold",
    fontSize: RFValue(25),
  },
  modalBodyText:{
    fontSize: RFValue(18),
    fontWeight:'bold',
    marginLeft:'5%'
  
  },
  line:{
    borderTopWidth:1,
    borderStyle:'dashed',
    borderColor:'#808080',
    width:'90%',
    marginBottom:'2%'
  }
});
