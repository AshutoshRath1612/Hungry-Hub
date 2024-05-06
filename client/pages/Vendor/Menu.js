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
  Modal,
  TextInput,
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
import { GetFoodByShopRoute, Host, UpdateFoodRoute } from "../../Constants";
import Container, { Toast } from "toastify-react-native";
import { RadioButton } from "react-native-paper";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Menu({ navigation, route }) {
  const listRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${Host}${GetFoodByShopRoute}/Mohanty & Co`)
      .then((res) => res.json())
      .then((data) => {
        sortByCategory(data);
      });
  }, []);

  function sortByCategory(foodItems) {
    const categories = {};

    // Group items by category
    foodItems.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });

    // Convert to the desired format
    const result = Object.keys(categories).map((category) => ({
      category,
      items: categories[category].map((item) => ({
        name: item.name,
        isAvailable: item.isAvailable,
        price: item.price,
        type: item.type === "Vegeterian" ? "Vegetarian" : "Non-Vegetarian",
        ratings: item.ratings,
        ratingCount: item.ratingCount,
        _id: item._id,
      })),
    }));

    return setFoods(result);
  }
  console.log(foods[0].items)
  const DATA = [
    {
      shopName: "Mio Amore",
      ratings: 3.8,
      ratingCount: 600,
      foods: [
        {
          category: "Snacks",
          items: [
            {
              name: "Burger",
              isAvailable: true,
              price: 100,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Pizza",
              isAvailable: true,
              price: 600,
              type: "Non-Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Sandwich",
              isAvailable: true,
              price: 450,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Main Course",
          items: [
            {
              name: "Biryani",
              isAvailable: true,
              price: 200,
              type: "Non-Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Fried Rice",
              isAvailable: true,
              price: 150,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Noodles",
              isAvailable: true,
              price: 180,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Desserts",
          items: [
            {
              name: "Ice Cream",
              isAvailable: true,
              price: 50,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Cake",
              isAvailable: true,
              price: 300,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Pastry",
              isAvailable: true,
              price: 100,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Drinks",
          items: [
            {
              name: "Cold Drink",
              isAvailable: true,
              price: 30,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Juice",
              isAvailable: true,
              price: 50,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Milk Shake",
              isAvailable: true,
              price: 70,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Fast Food",
          items: [
            {
              name: "Momos",
              isAvailable: true,
              price: 50,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Pasta",
              isAvailable: true,
              price: 100,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "French Fries",
              isAvailable: true,
              price: 70,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Beverages",
          items: [
            {
              name: "Tea",
              isAvailable: true,
              price: 10,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Coffee",
              isAvailable: true,
              price: 20,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Cold Coffee",
              isAvailable: true,
              price: 30,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Ice Cream",
          items: [
            {
              name: "Vanilla",
              isAvailable: true,
              price: 20,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Chocolate",
              isAvailable: true,
              price: 30,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Strawberry",
              isAvailable: true,
              price: 40,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
      ],
    },
  ];

  const [scrollY] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const toggleSwitch = () =>
    setCurrentItem({ ...currentItem, isAvailable: !currentItem.isAvailable });

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


  const handleEditSubmit = (id) => {
    setModalVisible(false);
    fetch(`${Host}${UpdateFoodRoute}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentItem),
    })
      .then((res) => res.json())
      .then((data) => {
        Toast.success(data.message);
      });
  };

  const EditModal = () => (
    <Modal visible={editModal} animationType="fade" transparent>
      <View style={styles.modalcontainer}>
        <View style={styles.containerView}>
          <Text style={{ color: "grey", fontWeight: "500" }}>Name</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              marginVertical: 5,
            }}
            value={currentItem.name}
          />
          <Text style={{ color: "grey", fontWeight: "500" }}>Category</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              marginVertical: 5,
            }}
            value={currentItem.category}
          />
          <Text style={{ color: "grey", fontWeight: "500" }}>Price</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              marginVertical: 5,
            }}
            value={currentItem.price.toString()}
          />
          <Text style={{ color: "grey", fontWeight: "500" }}>Type</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {editModal && (
              <>
                <RadioButton
                  value="Vegetarian"
                  status={currentItem.type === "Vegetarian" ? "checked" : "unchecked"}
                  onPress={() => setCurrentItem({ ...currentItem, type: "Vegetarian" })}
                />
                <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>
                  Vegetarian
                </Text>
                <RadioButton
                  value="Non-Vegetarian"
                  status={currentItem.type === "Non-Vegetarian" ? "checked" : "unchecked"}
                  onPress={() => setCurrentItem({ ...currentItem, type: "Non-Vegetarian" })}
                />
                <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>
                  Non-Vegetarian
                </Text>
              </>
            )}
          </View>
          <Text style={{ color: "grey", fontWeight: "500" }}>Available</Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#939293",
              marginTop: 10,
              width: "36%",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={toggleSwitch}
              style={{
                borderWidth: currentItem.isAvailable ? 1 : 0,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleSwitch}
              style={{
                borderWidth: !currentItem.isAvailable ? 1 : 0,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.btnView}>
            <Pressable style={styles.btn} onPress={() => setEditModal(false)}>
              <Text style={styles.txt}>Close</Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              onPress={() => handleEditSubmit(currentItem._id)}
            >
              <Text style={styles.txt}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
  
  

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
            <Pressable
              style={styles.btn}
              onPress={() => setWarningModal(false)}
            >
              <Text style={styles.txt}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  const scrollToCategory = (categoryIndex) => {
    const yOffset = HEADER_MAX_HEIGHT + 20 + categoryIndex * 300; // Assuming each category occupies 300 units of space
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
          <Container position="top" width="90%" />
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
                    setCurrentItem({ ...foodItem, category: item.category ,type:foodItem.type });
                  }}
                >
                  {currentItem != null && <EditModal />}
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
      <View style={styles.container}>
        <Animated.View style={[styles.header]}>
          <Image
            style={{ resizeMode: "contain", width: "40%" }}
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
              <Text style={{ fontSize: 18 }}>3.8</Text>
              <Text style={{ fontSize: 18 }}>(600+)</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.searchContainer]}>
          <Search />
        </Animated.View>

        <AnimatedFlatList
          ref={listRef}
          style={{ marginBottom: RFValue(50) }}
          data={foods}
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
              data={foods}
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
    </NavigationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
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
