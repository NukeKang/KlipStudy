import React, { createContext, useContext, useState } from "react";

import ConnectWallet from "./components/ConnectWallet";

const ModalContext = createContext();
const WalletContext = createContext();
const ButtonContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalIsOpen = useState(false);
  return (
    <ModalContext.Provider value={modalIsOpen}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalState = () => {
  const value = useContext(ModalContext);
  if (value === undefined) {
    throw new Error("useModalState should be used within ModalProvider");
  }

  return value;
};

export const WalletProvider = ({ children }) => {
  const connectStatus = useState(undefined);
  return (
    <WalletContext.Provider value={connectStatus}>
      {children}
    </WalletContext.Provider>
  );
};

export const useConnectState = () => {
  const value = useContext(WalletContext);
  if (value === undefined) {
    throw new Error("useWalletState should be used within WalletProvider");
  }

  return value;
};

export const ButtonProvider = ({ children }) => {
  const buttonType = useState("");

  return (
    <ButtonContext.Provider value={buttonType}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonState = () => {
  const value = useContext(ButtonContext);
  if (value === undefined) {
    throw new Error("useButtonState should be used within ButtonProvider");
  }

  return value;
};

const App = () => {
  return (
    <ModalProvider>
      <WalletProvider>
        <ButtonProvider>
          <ConnectWallet />
        </ButtonProvider>
      </WalletProvider>
    </ModalProvider>
  );
};

export default App;
