import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Host, SearchRoute } from "../Constants";

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route)

  const [data, setData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [searchItem, setSearchItem] = useState({
    name: '',
    shopName: '',
    type: '',
    category: ''
  });

  const categories = ["Vegetarian", "Non-Vegetarian"];

  useEffect(()=>{
    if (route.name === 'Vendor Menu' || route.name === 'Shop Menu') {
      setSearchItem({...searchItem,shopName:route.params.shopName})
    }
  },[route])

  const handleSubmit = () => {
    fetch(`${Host}${SearchRoute}?name=${searchItem.name}&type=${searchItem.type}&category=${searchItem.category}&shopName=${searchItem.shopName}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (route.name !== 'Shop Menu' && searchItem.name !== '') {
          navigation.navigate('Search Result', { searchItem, data });
        }
        if (route.name === 'Vendor Menu' || route.name === 'Shop Menu') {
          navigation.navigate('Shop Menu', { searchItem, data });
        }
      });
  };

  const handleSearch = (text) => {
    setSearchItem({ ...searchItem, name: text });
    handleSubmit();
  };

  return (
    <View style={styles.searchView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showFilter}
        onRequestClose={() => {
          setShowFilter(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.viewHeading}>
              <Text style={styles.filter}>Filter</Text>
              <FontAwesome
                name="times-circle"
                size={30}
                color="#007BFF"
                onPress={() => setShowFilter(false)}
              />
            </View>
            <View style={styles.category}>
              <RadioButton.Group
                onValueChange={(value) => setSearchItem({ ...searchItem, type: value })}
                value={searchItem.type}
              >
                {categories.map((category, index) => (
                  <RadioButton.Item label={category} value={category} key={index} />
                ))}
              </RadioButton.Group>
            </View>
            <Pressable style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={styles.btnText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.searchBox}>
        <FontAwesome
          name="search"
          size={20}
          color="orange"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Find Your Food..."
          placeholderTextColor="gray"
          returnKeyType="search"
          onChange={(e)=> setSearchItem({...searchItem , name: e.nativeEvent.text})}
          onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        />
      </View>
      <FontAwesome
        style={{ padding: 8, borderRadius: 5 }}
        color="orange"
        name="filter"
        size={30}
        onPress={() => setShowFilter(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 9,
    backgroundColor: "white",
    width: "80%",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  viewHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: "grey",
  },
  filter: {
    fontSize: 20,
    fontWeight: "bold",
  },
  category: {
    flexDirection: "column",
  },
  categoryItems: {
    justifyContent: "space-between",
  },
  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  btnText: {
    color: "white",
    fontSize: 15,
  },
});
