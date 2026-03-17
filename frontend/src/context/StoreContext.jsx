// 
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const saved = localStorage.getItem("cartItem");
    return saved ? JSON.parse(saved) : {};
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const url = "http://localhost:4000";

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItem(prev => {
      const updated = !prev[itemId] ? { ...prev, [itemId]: 1 } : { ...prev, [itemId]: prev[itemId] + 1 };
      localStorage.setItem("cartItem", JSON.stringify(updated));
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId, userId: token.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.log("Error adding to cart:", err.response?.data?.message || err.message);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItem(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      localStorage.setItem("cartItem", JSON.stringify(updated));
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId, userId: token.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.log("Error removing from cart:", err.response?.data?.message || err.message);
      }
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartItem).reduce((total, id) => {
      const item = food_list.find(f => f._id === id);
      return item ? total + item.price * cartItem[id] : total;
    }, 0);
  };

  // Load cart from backend
  const loadCartData = async () => {
    if (!token) return;
    try {
      const res = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
      setCartItem(res.data.cartData || {});
      localStorage.setItem("cartItem", JSON.stringify(res.data.cartData || {}));
    } catch (err) {
      console.log("Error loading cart:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (token) loadCartData();
  }, [token]);

  return (
    <StoreContext.Provider value={{ cartItem, setCartItem, addToCart, removeFromCart, getTotalCartAmount, token, setToken, url, food_list }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
