import React, { createContext, useContext, useState } from "react";
import Main from "./pages/Main";

const ModalContext = createContext();
const WalletContext = createContext();
const PrepareContext = createContext();
const WalletAdressContext = createContext();

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

export const PrepareProvider = ({ children }) => {
  const PrepareType = useState("");

  return (
    <PrepareContext.Provider value={PrepareType}>
      {children}
    </PrepareContext.Provider>
  );
};

export const usePrepareState = () => {
  const value = useContext(PrepareContext);
  if (value === undefined) {
    throw new Error("usePrepareState should be used within PrepareProvider");
  }

  return value;
};

export const WalletAdressProvider = ({ children }) => {
  const walletAddress = useState(undefined);

  return (
    <WalletAdressContext.Provider value={walletAddress}>
      {children}
    </WalletAdressContext.Provider>
  );
};

export const useWalletState = () => {
  const value = useContext(WalletAdressContext);
  if (value === undefined) {
    throw new Error(
      "useWalletState should be used within walletAddressProvider"
    );
  }

  return value;
};

const App = () => {
  return (
    <ModalProvider>
      <WalletProvider>
        <PrepareProvider>
          <WalletAdressProvider>
            <Main />
          </WalletAdressProvider>
        </PrepareProvider>
      </WalletProvider>
    </ModalProvider>
  );
};

export default App;
