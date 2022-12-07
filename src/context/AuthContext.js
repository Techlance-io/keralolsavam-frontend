import React, { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    if (user) {
      getAuthToken();
    }
  }, [user]);

  const getAuthToken = async () => {
    const token = await auth.currentUser?.getIdToken(true);
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
