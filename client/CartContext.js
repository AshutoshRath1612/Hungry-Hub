import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let itemExists = false;

      const newState = state.map((item) => {
        if (item.foodItem.name === action.payload.foodItem.name) {
          itemExists = true;
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      if (!itemExists) {
        newState.push(action.payload);
      }

      return newState;
      case "REMOVE_FROM_CART":
  return state
    .map(item => {
      if (item.foodItem.name === action.payload && item.quantity >= 1) {
        console.log(item.quantity)
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    })
    .filter(item => !(item.foodItem.name === action.payload && item.quantity <= 0));
    case "LOAD_CART_FROM_STORAGE":
      return [...action.payload];
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

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

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
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
