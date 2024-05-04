import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      if (state.length === 0) {
        return [newItem];
      } else {
        const existingShopIndex = state.findIndex(
          (shop) => shop.shopName === newItem.shopName
        );
        if (existingShopIndex !== -1) {
          const existingItemIndex = state[existingShopIndex].items.findIndex(
            (item) => item.name === newItem.items[0].name
          );
          if (existingItemIndex !== -1) {
            state[existingShopIndex].items[existingItemIndex].quantity += 1;
          } else {
            state[existingShopIndex].items.push(newItem.items[0]);
          }
        } else {
          return state; // Return state as is without adding the item
        }
        return [...state];
      }

    case "REMOVE_FROM_CART":
      const itemName = action.payload;
      const newState = state
        .map((shop) => {
          const updatedItems = shop.items
            .map((item) => {
              if (item.name === itemName) {
                if (item.quantity > 1) {
                  return { ...item, quantity: item.quantity - 1 };
                } else {
                  // If quantity is 1, remove the item
                  return null;
                }
              }
              return item;
            })
            .filter((item) => item !== null); // Filter out null items

          // Check if there are any items left in the shop
          if (updatedItems.length > 0) {
            return { ...shop, items: updatedItems };
          } else {
            return null; // If no items left, remove the shop
          }
        })
        .filter((shop) => shop !== null); // Filter out null shops

      if (newState.length === 0) {
        removeFromCart();
      }
      return newState.length > 0 ? newState : []; // Return newState or empty array if no shops left

    case "LOAD_CART_FROM_STORAGE":
      return [...action.payload];

    case "CLEAR_CART":
      removeFromCart();
      return [];

    default:
      return state;
  }
};

const removeFromCart = async () => {
  try {
    await AsyncStorage.removeItem("cart");
  } catch (error) {
    console.error("Failed to remove cart from storage:", error);
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const cartItems = await AsyncStorage.getItem("cart");
        if (cartItems) {
          dispatch({
            type: "LOAD_CART_FROM_STORAGE",
            payload: JSON.parse(cartItems),
          });
        }
      } catch (error) {
        console.error("Failed to load cart from storage:", error);
      }
    };

    loadCartFromStorage();
  }, []);

  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to storage:", error);
      }
    };

    saveCartToStorage();
  }, [cart]);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {modalVisible && <ModalComponent onClose={closeModal} />}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
