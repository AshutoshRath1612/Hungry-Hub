import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Search from "../../components/Search";
import { RFValue } from "react-native-responsive-fontsize";
import Nav from "../../components/Nav";
import { NavigationContext } from "../../NavContext";
import { DeleteFoodRoute, GetFoodByShopRoute, Host, SearchRoute } from "../../Constants";
import Container, { Toast } from "toastify-react-native";
import LottieView from "lottie-react-native";
import EditFoodModal from "../../components/EditFoodModal";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Menu({ navigation, route }) {
  const listRef = useRef(null);

  const [scrollY] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [shop,setShop] = useState(null)
  const [currentItem, setCurrentItem] = useState({
    name: "",
    isAvailable: false,
    price: 0,
    type: "Vegeterian",
    ratings: 0,
    ratingCount: 0,
    _id: "",
    category: "",
  });
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setShop(route.params.shopName)
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
        `${Host}${SearchRoute}?name=${searchItem.name}&shopName=${shop}&type=${searchItem.type}&category=${searchItem.category}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data[0])
        });
    }
  }, [route.params.searchItem]);

  useEffect(() => {
    if (isUpdated) {
      getMenu();
      Toast.success("Food Updated Successfully");
      setIsUpdated(false);
    }
  }, [isUpdated]);

  const HEADER_MAX_HEIGHT = 150;
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

  const handleDelete = () => {
    fetch(`${Host}${DeleteFoodRoute}/${currentItem._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setWarningModal(false);
        getMenu();
        Toast.error("Food Deleted Successfully");
      });
  };

  const DeleteModal = () => (
    <Modal visible={warningModal} animationType="fade" transparent>
      <View style={styles.modalcontainer}>
        <View style={[styles.containerView, { borderWidth: 1 }]}>
          <Text style={{ fontSize: RFValue(14), fontWeight: "500" }}>
            Are you sure you want to delete {currentItem.name} from menu?
          </Text>
          <View style={styles.btnView}>
            <Pressable
              style={styles.btn}
              onPress={() => setWarningModal(false)}
            >
              <Text style={styles.txt}>Close</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={() => handleDelete()}>
              <Text style={styles.txt}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  const scrollToCategory = (categoryIndex) => {
    let yOffset = HEADER_MAX_HEIGHT + 20; // Initial offset
  
    // Calculate the offset based on the cumulative heights of items in previous categories
    for (let i = 0; i < categoryIndex; i++) {
      yOffset += data.categories[i].items.reduce((acc, curr) => acc + 100, 0);
    }
  
    listRef.current.scrollToOffset({ animated: true, offset: yOffset });
    setExpanded(false);
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
        <View key={item.category} style={styles.categoryContainer}>
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
                    width: "50%",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="star" size={18} color="black" />
                  <Text style={{ marginHorizontal: 2 }}>
                    {foodItem.ratings} ({foodItem.ratingCount}+)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setEditModal(true);
                    setCurrentItem({
                      ...foodItem,
                      category: item.category,
                      type: foodItem.type,
                    });
                  }}
                >
                  {currentItem != null && (
                    <EditFoodModal
                      editModal={editModal}
                      setEditModal={setEditModal}
                      currentItem={currentItem}
                      setCurrentItem={setCurrentItem}
                      setIsUpdated={setIsUpdated}
                    />
                  )}
                  <MaterialCommunityIcons
                    name="pencil-circle-outline"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentItem({ ...foodItem, category: item.category });
                    setWarningModal(true);
                  }}
                >
                  {currentItem != null && <DeleteModal />}
                  <Ionicons name="trash-bin" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <NavigationContext.Provider value={{ navigation, route }}>
      {isLoading ? (
        <LottieView
          source={require("../../assets/icons/Loading.json")}
          autoPlay
          loop
          style={{ flex: 1 }}
        />
      ) : (
        <View style={styles.container}>
          <Container position="top" width="90%" />
          <Animated.View style={[styles.header]}>
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
                  width: "60%",
                  justifyContent: "space-between",
                }}
              >
                <FontAwesome name="star" size={15} color="black" />
                <Text style={{ fontSize: 18 }}>{data.shop.ratings}</Text>
                <Text style={{ fontSize: 18 }}>({data.shop.ratingCount}+)</Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View style={[styles.searchContainer]}>
            <Search />
          </Animated.View>

          <AnimatedFlatList
            ref={listRef}
            style={{ marginBottom: RFValue(50) }}
            data={data.categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem} // Add some initial padding
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
          {expanded && (
            <View style={styles.categoryButtonsContainer}>
              <FlatList
                data={data.categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                  renderCategoryButton(item, index)
                }
              />
            </View>
          )}
          <TouchableOpacity
            style={[styles.floatingButton]}
            onPress={toggleExpand}
          >
            <FontAwesome
              name={expanded ? "sticky-note" : "book"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Nav />
          </View>
        </View>
      )}
    </NavigationContext.Provider>
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
    elevation: 2,
    backgroundColor: "white",
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
    borderBottomWidth: 1,
    borderColor: "grey",
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
    width: "30%",
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
    bottom: RFValue(70),
    right: 20,
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  containerView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  btnView: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 13,
    marginTop: RFValue(25),
  },
  btn: {
    width: "40%",
    marginHorizontal: "2.5%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3262A2",
  },
  txt: {
    color: "white",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
});
