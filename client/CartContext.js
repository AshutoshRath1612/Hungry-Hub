import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.foodItem.id === action.payload.foodItem.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { foodItem: action.payload.foodItem, category: action.payload.category, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.foodItem.id !== action.payload.foodItem.id),
      };
    case 'REMOVE_ITEM':
      const itemToRemoveIndex = state.items.findIndex(item => item.foodItem.id === action.payload.foodItem.id);
      if (itemToRemoveIndex !== -1) {
        const updatedItems = [...state.items];
        if (updatedItems[itemToRemoveIndex].quantity > 1) {
          updatedItems[itemToRemoveIndex].quantity -= 1;
        } else {
          updatedItems.splice(itemToRemoveIndex, 1);
        }
        return {
          ...state,
          items: updatedItems,
        };
      }
      return state;
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = item => {
    console.log(item)
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = item => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
