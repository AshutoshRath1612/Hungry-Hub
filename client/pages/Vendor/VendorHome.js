import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Nav from "../../components/Nav";
import { NavigationContext } from "../../NavContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Host, currentOrderRoute } from "../../Constants";

export default function VendorHome({ navigation, route}) {
  const [totalOrders, setTotalOrders] = useState(10000);
  const [Loading,setLoading] = useState(true)
  const [user , setUser] = useState({})
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(()=>{
    if(route.params !== undefined){
    setData()
    }
    getUser()
    setLoading(false)
  },[])
  
  const getUser = async() => {
    const user = await AsyncStorage.getItem('user')
    setUser(JSON.parse(user))
  }
  const getCurrentOrders = async () => {
    fetch(`${Host}${currentOrderRoute}/${user.shopName}`)
    .then(res => res.json())
    .then(data => {
      setCurrentOrders(data)
    })
  }

  useEffect(() => {

    getCurrentOrders()
    setInterval(() => {
    getCurrentOrders()
    }
    , 60 * 1000);
  }, [user]);

  const setData = async() => {
    const {token,...userDetails} = route.params.user
    await AsyncStorage.setItem('user' , JSON.stringify(userDetails))
    await AsyncStorage.setItem('token' , JSON.stringify(token))
  }

  return (
    <NavigationContext.Provider value={{ navigation, route }}>


    <View style={{ height: "100%" }}>
    {Loading ? (
      <View style={styles.center}>
        <LottieView
          source={require('../../assets/icons/Loading.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    ):(
      <LinearGradient colors={["#C38888","white"]} style={{height:'100%',justifyContent:'center'}}>
      <Header />
      <Text
        style={{
          fontSize: RFValue(25),
          textAlign: "center",
          fontWeight: "bold",
          marginVertical: 20,
        }}
      >
        {user.shopName}
      </Text>
      <View style={styles.top}>
        <Text
          style={{
            fontSize: RFValue(15),
            fontWeight: "500",
            marginHorizontal: 20,
          }}
        >
          Today:{" "}
          {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={styles.infoCard}>
            <Ionicons name="fast-food" size={24} color="white" />
            <Text style={{ fontSize: RFValue(20),color:"white" }}>10000</Text>
          </View>
          <View style={styles.infoCard}>
            <FontAwesome name="rupee" size={24} color="white" />
            <Text style={{ fontSize: RFValue(20),color:"white" }}>0</Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, height: 20 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: RFValue(15), fontWeight: "500" }}>
          Current Orders
        </Text>
        <View style={styles.searchBox}>
          <FontAwesome
            name="search"
            size={20}
            color="orange"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search Orders..."
            keyboardType="numeric"
            placeholderTextColor="gray"
            returnKeyType="search"
            onSubmitEditing={(e) => handleNavigate(e)}
          />
        </View>
      </View>
      <View
        style={{
          height: "49%",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth:1,
          marginTop:RFValue(20),
          width:'100%'
        }}
      >
        {currentOrders !== null ? (
          <FlatList
            data={currentOrders}
            style={{marginBottom:'2%'}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Display two columns
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            renderItem={({ item }) => (
              <View onTouchEnd={()=> navigation.navigate('Vendor Order Summary' , {item:item})} style={styles.ordercard}>
                <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                  No. {item.orderNo}
                </Text>
                {item.userId.name !== undefined ? <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                  Name: {item.userId.name}
                </Text>
                :
                <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                  RegdNo: {item.userId.regdNo}
                  </Text>
                }
              </View>
            )}
          />
        ) : (
          <Text style={{ fontSize: RFValue(20) }}>No current orders</Text>
        )}
      </View>
      <View style={{ position:'absolute',bottom:0,width:'100%' }}>
      <Nav />
      </View>
      </LinearGradient>
    )}
      
    </View>
    </NavigationContext.Provider>
  );
}

const styles = StyleSheet.create({
  top: {
    justifyContent: "space-between",
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#915858",
    elevation: 5,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 9,
    backgroundColor: "white",
    width: "40%",
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
  ordercard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginHorizontal:'5%',
    height: 100,
    width: "40%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    elevation:5
  },
});
