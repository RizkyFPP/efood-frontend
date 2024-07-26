import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item._id === action.product._id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          notificationCount: state.notificationCount + 1,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }],
        notificationCount: state.notificationCount + 1,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.id),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    case "RESET_NOTIFICATION_COUNT":
      return {
        ...state,
        notificationCount: 0,
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  notificationCount: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  const resetNotificationCount = () => {
    dispatch({ type: "RESET_NOTIFICATION_COUNT" });
  };

  const calculateTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        notificationCount: state.notificationCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetNotificationCount,
        calculateTotalPrice,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export { CartContext, CartProvider };
