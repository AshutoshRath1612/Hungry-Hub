import {
  View,
  ImageBackground,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Reccomandation() {
  const data = [
    {
      image: require("../assets/LandingBG.png"),
      shopName: "Mio Amore",
      name: "Roll",
      price: 100,
      type:'Vegeterian'
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "Urban Flavours",
      name: "Chicken Tikka Masala",
      price: 1000,
      type:'Non-Vegeterian'
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "def",
      name: "Card 3",
      price: 1200,
      type:'Non-Vegeterian'
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "abc",
      name: "Card 4",
      price: 150,
      type:'Vegeterian'
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "abc",
      name: "Card 5",
      price: 130,
      type:'Vegeterian'
    },
  ];

  const CardItem = ({ item }) => {
    return (
      <View style={[styles.card,  item.type === 'Vegeterian' ? {backgroundColor:'#127311'} : {backgroundColor:'#D31911'}]}>
          <Image source={item.image} resizeMode="contain" style={styles.itemImg} /> 
          <View style={styles.cardInfo}>
          <View style={styles.leftInfo}>
            <Text style={styles.text}>{item.name.length >14 ? item.name.substring(0,14) + '...': item.name}</Text>
            <Text style={[styles.text , {fontWeight:'bold'}]}>{item.shopName.length >14 ? item.shopName.substring(0,14) + '...': item.shopName}</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.text}>₹ {item.price}</Text>
            <Pressable style={styles.btn}>
              <Text style={{color:'white',fontSize:13}}>Add <FontAwesome  color="white" name="plus"></FontAwesome></Text>
            </Pressable>
          </View>
          </View>
      </View>
    );
  };

  return (
    <View style={styles.reccomandation}>
      <Text style={styles.title}>Recommended for You</Text>
      <FlatList
        horizontal
        keyboardShouldPersistTaps="handled"
        data={data}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reccomandation: {
    overflow: "hidden",
    alignItems: "flex-start",
  },
  card: {
    width: 190,
    height: 150,
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    elevation: 6, 
  },
  title: {
    fontSize: 25,
    marginLeft: 15,
    textAlign: "center",
    fontFamily: "Ubuntu_700Bold",
  },
  itemImg: {
    width: "100%",
    height: "60%",
    opacity: 0.8,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius:10
  },
  cardInfo:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:2,
    width:'100%',
    height:'40%',
  },
  leftInfo:{
    justifyContent: "space-around",
    width:'65%',
    paddingHorizontal:5,
    alignItems:'flex-start'
  },
  rightInfo:{
    justifyContent: "space-around",
    width:'35%',
    paddingHorizontal:5,
    alignItems:'flex-end',
  },
  text:{
    fontSize: 15,
    color:'white',
    fontFamily: "Ubuntu_400Regular",
  },
  btn:{
    backgroundColor:'rgba(128,128,128,0.6)',
    padding:4,
    marginVertical:2,
    borderRadius:5,
    width:'100%',
    alignItems:'center',
  }
});
