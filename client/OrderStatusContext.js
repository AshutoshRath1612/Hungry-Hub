// OrderStatusContext.js
import React, { createContext, useContext, useState } from 'react';

const OrderStatusContext = createContext();

export const useOrderStatus = () => useContext(OrderStatusContext);

export const OrderStatusProvider = ({ children }) => {
  const [orderStatus, setOrderStatus] = useState('pending');

  return (
    <OrderStatusContext.Provider value={{ orderStatus, setOrderStatus }}>
      {children}
    </OrderStatusContext.Provider>
  );
};
