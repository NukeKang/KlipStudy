import React from "react";
import { usePrepareState, useModalState } from "../App";

const ConnectWalletButton = () => {
  const [, setModalIsOpen] = useModalState(false);
  const [, setPrepareType] = usePrepareState("");

  const openModal = (event) => {
    setPrepareType(event.target.value);
    setModalIsOpen(true);
  };

  return (
    <>
      <header>Klip Test</header>
      <button value="connectWallet" onClick={openModal}>
        {"지갑연결하기"}
      </button>
    </>
  );
};

export default ConnectWalletButton;
