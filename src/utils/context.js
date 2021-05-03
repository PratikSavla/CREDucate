import React, { useState, createContext } from "react";

/**
 * Centralized object for storing important app properties.
 * For the purpose of this app, React Context was used instead of a
 * store manager like React Redux.
 * */
export const defaultAppState = {
    accessToken: null,
    didToken: null,
    isAuthenticated: false,
    username: null,
    isInstitution: false,
    isVerifier:false,
    name: null,
    contact: null,
    address: null,
    VCIssued: null,
    _id: null
}

// Create Context Object
export const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = ({children}) => {
  const [appState, setAppState] = useState(defaultAppState);

  return (
    <AppContext.Provider value={[appState, setAppState]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider
