import React from "react";
import { useButtonState, useConnectState, useModalState } from "../App";
import ModalPortal from "../Portal";
import SignWallet from "./SignWallet";
import WalletModal from "./WalletModal";

const ConnectWallet = () => {
  const [modalIsOpen, setModalIsOpen] = useModalState();
  const [connectStatus] = useConnectState();
  const [, setButtonType] = useButtonState();

  const openModal = (event) => {
    setButtonType(event.target.value);
    setModalIsOpen(true);
  };

  return (
    <>
      <header>Klip Test</header>
      <button value="connectWallet" onClick={openModal}>
        {"지갑연결하기"}
      </button>
      {modalIsOpen && (
        <ModalPortal>
          <WalletModal />
        </ModalPortal>
      )}
      {connectStatus === "completed" && <SignWallet />}
    </>
  );
};

export default ConnectWallet;
