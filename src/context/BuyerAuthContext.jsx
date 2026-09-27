import { createContext, useContext, useState } from "react";

const BuyerAuthContext = createContext(null);

export function BuyerAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("greencart_buyer");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Could not restore buyer session:", error);
      localStorage.removeItem("greencart_buyer");
      return null;
    }
  });

  const login = (userData) => {
    const buyer = {
      name: userData?.name || "Buyer",
      email: userData?.email || "",
      company: userData?.company || "GreenCart Buyer",
    };

    localStorage.setItem(
      "greencart_buyer",
      JSON.stringify(buyer)
    );

    setUser(buyer);
  };

  const logout = () => {
    localStorage.removeItem("greencart_buyer");
    localStorage.removeItem("greencart_buyer_auth");

    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return (
    <BuyerAuthContext.Provider value={value}>
      {children}
    </BuyerAuthContext.Provider>
  );
}

export function useBuyerAuth() {
  const context = useContext(BuyerAuthContext);

  if (!context) {
    throw new Error(
      "useBuyerAuth must be used inside BuyerAuthProvider"
    );
  }

  return context;
}