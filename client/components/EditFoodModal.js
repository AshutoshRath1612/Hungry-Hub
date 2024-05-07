import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { RadioButton } from 'react-native-paper';
import { Host, UpdateFoodRoute } from '../Constants';
import {Toast} from 'toastify-react-native'


export default function EditFoodModal({editModal , setEditModal , currentItem,setCurrentItem , setIsUpdated }) {

    const toggleSwitch = () =>
        setCurrentItem({...currentItem , isAvailable : !currentItem.isAvailable})

    const handleEditSubmit = (id) => {
            fetch(`${Host}${UpdateFoodRoute}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentItem),
            })
            .then((res) => res.json())
            .then((data) => {
                setIsUpdated(true)
                setEditModal(false);
            })
        };
        


  return (
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
                onChangeText={(text) => setCurrentItem({ ...currentItem, name: text })}
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
                onChangeText={(text) => setCurrentItem({ ...currentItem, category: text })}
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
                onChangeText={(text) => setCurrentItem({ ...currentItem, price: text })}
              />
              <Text style={{ color: "grey", fontWeight: "500" }}>Type</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
}


const styles = StyleSheet.create({
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
})
