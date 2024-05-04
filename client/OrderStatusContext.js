// OrderStatusContext.js
import React, { createContext, useContext, useReducer } from 'react';

const OrderStatusContext = createContext();

export const useOrderStatus = () => useContext(OrderStatusContext);

const orderStatusReducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case 'SET_ORDER_STATUS':
      return action.payload;
    default:
      return state;
  }
};

export const OrderStatusProvider = ({ children }) => {
  const [currentOrder, dispatch] = useReducer(orderStatusReducer , [])

  return (
    <OrderStatusContext.Provider value={{ currentOrder, dispatch }}>
      {children}
    </OrderStatusContext.Provider>
  );
};
