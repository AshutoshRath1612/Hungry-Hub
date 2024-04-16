import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.payload)
      if(state.length !==0){

      }
      else{
        return [...state, action.payload];
      }
      // let itemExists = false;

      // const newState = state.map((item) => {
      //   if (item.foodItem.name === action.payload.foodItem.name) {
      //     itemExists = true;
      //     return { ...item, quantity: item.quantity + 1 };
      //   } else {
      //     return item;
      //   }
      // });

      // if (!itemExists) {
      //   newState.push(action.payload);
      // }

      // return newState;


    case "REMOVE_FROM_CART":
      return state
        .map((shop) => {
          return {
            ...shop,
            category: shop.category
              .map((category) => {
                return {
                  ...category,
                  foodItem: category.foodItem
                    .map((foodItem) => {
                      if (
                        foodItem.name === action.payload &&
                        foodItem.quantity > 1
                      ) {
                        return {
                          ...foodItem,
                          quantity: foodItem.quantity - 1,
                        };
                      } else if (
                        foodItem.name === action.payload &&
                        foodItem.quantity === 1
                      ) {
                        return null; // return null if the quantity is 1, so it will be removed
                      } else {
                        return foodItem;
                      }
                    })
                    .filter((foodItem) => foodItem !== null), // remove the food items that are null
                };
              })
              .filter((category) => category.foodItem.length > 0), // remove the categories that have no food items
          };
        })
        .filter((shop) => shop.category.length > 0); // remove the shops that have no categories

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
