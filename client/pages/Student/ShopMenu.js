import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../../components/Search";
import { RFValue } from "react-native-responsive-fontsize";
import { useCart } from "../../CartContext";
import ShopModal from "../../components/ShopModal";
import CartCard from "../../components/CartCard";
import { LinearGradient } from "expo-linear-gradient";
import { GetFoodByShopRoute, Host, SearchRoute } from "../../Constants";
import LottieView from "lottie-react-native";


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ShopMenu({ route }) {
  const listRef = useRef(null);

  const { cart, dispatch } = useCart();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shop, setShop] = useState(null);


  useEffect(() => {
    setShop({shopName: route.params.shopName , id: route.params.id});
    getMenu();
  }, []);
  
  const getMenu = () => {
    fetch(`${Host}${GetFoodByShopRoute}/${route.params.shopName}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
        setIsLoading(false);
      });
  };
  
  useEffect(() => {
    if (route.params && route.params.searchItem) {
      const { searchItem } = route.params;
      fetch(
        `${Host}${SearchRoute}?name=${searchItem.name}&shopName=${shop.shopName}&type=${searchItem.type}&category=${searchItem.category}`
      )
        .then((res) => res.json())
        .then((data) => {
          if(!data.message)
            setData(data[0])
          else
            setData(data)
        });
    }
  }, [route.params.searchItem]);

  const addToCart = (item) => {
     if (cart.length === 0) {
      dispatch({ type: "ADD_TO_CART", payload: item });
    } else {
      if (cart[0].shopName === item.shopName) {
        dispatch({ type: "ADD_TO_CART", payload: item });
      } else {
        setCurrentData(item);
        setModalVisible(true);
      }
    }
  };

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

 

  const [scrollY] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);

  const HEADER_MAX_HEIGHT = 0;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, 0],
    extrapolate: "clamp",
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddItem = (item, foodItem) => {
    addToCart({
      items: [{...foodItem , quantity:1 , category:item.category}],
      shopName: data.shop.name,
      shopId: data.shop._id
    });
  };

  const handleRemoveItem = (foodItem)=>{
    removeFromCart(foodItem.name);
  }
  const scrollToCategory = (categoryIndex) => {
    let yOffset = HEADER_MAX_HEIGHT + 20; // Initial offset
  
    // Calculate the offset based on the cumulative heights of items in previous categories
    for (let i = 0; i < categoryIndex; i++) {
      yOffset += data.categories[i].items.reduce((acc, curr) => acc + 100, 0);
    }
  
    listRef.current.scrollToOffset({ animated: true, offset: yOffset });
    setExpanded(false);
  };
  


const findItem = (foodItem) => {
  if (cart.length > 0 && cart[0].items) {
  return cart[0].items.some((item) => {
      return item.name === foodItem.name;
    });
}
};

  const renderCategoryButton = (item, index) => (
    <TouchableOpacity key={index} onPress={() => scrollToCategory(index)}>
      <View style={styles.categoryButton}>
        <Text style={{ flex: 1, color: "white", fontSize: RFValue(13) }}>
          {item.category}
        </Text>
        <Text style={{ fontSize: RFValue(13), color: "white" }}>
          {item.items.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
        <LinearGradient colors={["#FFD7D7","white"]} key={item.category} style={styles.categoryContainer}>
          <Text style={styles.category}>{item.category}</Text>
          {item.items.map((foodItem, index) => (
            <View key={index} style={styles.menuItem}>
              <View style={styles.logoContainer}>
                {foodItem.type === "Vegetarian" ? (
                  <Image
                    source={require("../../assets/icons/VegLogo.png")}
                    style={styles.logo}
                  />
                ) : (
                  <Image
                    source={require("../../assets/icons/NonVegLogo.png")}
                    style={styles.logo}
                  />
                )}
              </View>
              <View style={styles.itemDetails}>
                <Text style={{ fontSize: RFValue(15) }}>{foodItem.name}</Text>
                <Text
                  style={{
                    marginVertical: RFValue(5),
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  ₹ {foodItem.price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "40%",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="star" size={15} color="black" />
                  <Text style={{marginHorizontal:2}}>
                    {foodItem.ratings} ({foodItem.ratingCount}+)
                  </Text>
                </View>
              </View>
              {findItem(foodItem) ? (
                <View style={[styles.addButton,{
                      borderColor:
                        foodItem.type === "Vegetarian" ? "green" : "red",
                      shadowColor:
                        foodItem.type === "Vegetarian" ? "green" : "red",
                      justifyContent:'space-between'
                    },]}>
                  <TouchableOpacity onPress={()=>handleRemoveItem(foodItem)}>
                    <FontAwesome name="minus" size={18} color='#4ab557'/>
                  </TouchableOpacity>
                  {cart[0].items.map(
                    (items) =>
                        items.name === foodItem.name && (
                        <Text key={index} style={{color:'#4ab557' , fontWeight:'bold',fontSize: RFValue(14)}}>{items.quantity}</Text>
                      )
                  )}
                  <TouchableOpacity onPress={()=>handleAddItem(item,foodItem)}>
                    <FontAwesome name="plus" size={18} color='#4ab557' />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAddItem(item, foodItem)}
                  style={[
                    styles.addButton,
                    {
                      borderColor:
                        foodItem.type === "Vegetarian" ? "green" : "red",
                      shadowColor:
                        foodItem.type === "Vegetarian" ? "green" : "red",
                    },
                  ]}
                >
                  <Text style={{ fontSize: RFValue(14), paddingHorizontal: 5,fontWeight:'bold',color:'#4ab557' }}>
                    ADD
                  </Text>
                  <FontAwesome
                    style={{ alignItems: "center" }}
                    name="plus"
                    size={18}
                    color="#4ab557"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
    {
      isLoading ? (
        <LottieView
          source={require("../../assets/icons/Loading.json")}
          autoPlay
          loop
          style={{ flex: 1 }}
        />

      ):
      (<View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Image
              style={{ resizeMode: "contain", width: "30%" }}
              source={require("../../assets/images/Logo.png")}
            />
            <View style={styles.shopInfo}>
              <Text style={{ fontSize: RFValue(25), fontWeight: "bold" }}>
                {route.params.shopName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%",
                  justifyContent: "space-between",
                }}
              >
                <FontAwesome name="star" size={15} color="orange" />
                <Text style={{ fontSize: 18 }}>{data.shop.ratings}</Text>
                <Text style={{ fontSize: 18 }}>({data.shop.ratingCount}+)</Text>
              </View>
            </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.searchContainer,
          { transform: [{ translateY: searchTranslateY }] },
        ]}
      >
        <Search />
      </Animated.View>
      <ShopModal data={currentData} shopName={cart[0]?.shopName} visible={modalVisible} onClose={() => setModalVisible(false)} />
   
      {data && !data.message ? (<AnimatedFlatList
        ref={listRef}
        data={data.categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }} // Add some initial padding
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />)
      : (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:RFValue(20),fontWeight:'bold',color:'red'}}>{data.message}</Text>
        </View>
      )
      }
      {expanded && !data.message &&  (
        <View style={styles.categoryButtonsContainer}>
          <FlatList
            data={data.categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderCategoryButton(item, index)}
          />
        </View>
      )}
      {data && !data.message && <TouchableOpacity style={[styles.floatingButton , {bottom: cart.length != 0 ? 90 : 20}]} onPress={toggleExpand}>
        <FontAwesome
          name={expanded ? "sticky-note" : "book"}
          size={24}
          color="white"
        />
      </TouchableOpacity>}
      {cart.length !== 0 && <CartCard />}
    </View>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
 header: {
    height:'25%',
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    overflow: "hidden",
    flexDirection: "row",
  },
  shopImage: {
    width: "100%",
    height: RFValue(95),
    resizeMode: "contain",
    borderRadius: 20,
    backgroundColor: "red",
  },
  shopInfo: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
    paddingVertical: 10,
  },
  searchContainer: {
    position: "relative",
    // top: RFValue(7),
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 2,
    backgroundColor: "#FDF1F1",
    paddingVertical: 5,
  },
  category: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginTop: RFValue(10),
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  addButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    elevation: 5,
    width:'30%'
  },
  categoryButtonsContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 20,
    zIndex: 100,
    width: "60%",
    height: "50%",
    backgroundColor: "black",
    alignItems: "center",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
