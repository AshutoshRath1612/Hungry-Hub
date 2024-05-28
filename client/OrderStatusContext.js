import React, { createContext, useContext, useReducer } from "react";

const OrderStatusContext = createContext();

const initialState = {
  orders: [],
};

const orderStatusReducer = (state, action) => {
  switch (action.type) {
    case "ORDERS":
      return { ...state, orders: action.payload };
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
