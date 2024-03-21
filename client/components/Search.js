import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

export default function Search() {
  const [showFilter, setShowFilter] = useState(false);
  const [categoryy, setCategory] = useState("");

  const categories = ["Vegeterian", "Non-Vegeterian"];

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
              {categories.map((category, index) => (
                <RadioButton.Group
                  key={index}
                  style={styles.categoryItems}
                  onValueChange={(value) => setCategory(value)}
                  value={categoryy}
                >
                  <RadioButton.Item label={category} value={category} />
                </RadioButton.Group>
              ))}
            </View>
            <Pressable style={styles.btn}><Text style={styles.btnText}>Submit</Text></Pressable> 
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
    borderRadius: 5,
    padding: 9,
    backgroundColor: "white",
    width: "70%",
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
  btnText:{
    color:"white",
    fontSize:15
  }
});
