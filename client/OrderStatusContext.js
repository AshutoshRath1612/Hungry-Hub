import React, { createContext, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetOrderByUserRoute, Host } from "./Constants";

const OrderStatusContext = createContext();

const initialState = {
  currentOrder: [],
};

const orderStatusReducer = (state, action) => {
  switch (action.type) {
    case "ORDERS":
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
};

export const OrderStatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderStatusReducer, initialState);

  return (
    <OrderStatusContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrderStatusContext.Provider>
  );
};

export const useOrderStatus = () => {
  return useContext(OrderStatusContext);
};
