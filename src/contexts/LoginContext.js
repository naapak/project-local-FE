import React, {createContext, useEffect, useState} from "react";
import jwt from "jsonwebtoken";
import { useAuth0 } from "@auth0/auth0-react";
export const LoginContext = createContext();


export const LoginProvider = props => {
  const { isAuthenticated, user, logout,  isLoading} = useAuth0();
  const [login, setLogin] = useState(   "loggedOut"  );
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    console.log("I am being called?",isAuthenticated )
    if (isAuthenticated){
      setLogin(   "loggedIn"  );
    }
  }, [isAuthenticated])

  const [userDetails, setUser] = useState(user);
  const Logout = history => {
    logout({ returnTo: window.location.origin });
    setLogin("loggedOut");
  };
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  return (
    <LoginContext.Provider value={{ login, setLogin, Logout, userDetails, setUser, cart, setCart }}>
      {props.children}
    </LoginContext.Provider>
  );
};
