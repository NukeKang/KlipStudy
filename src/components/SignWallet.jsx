import React from "react";
import { useButtonState, useModalState } from "../App";

const SignWallet = () => {
  const [, setModalIsOpen] = useModalState();
  const [, setButtonType] = useButtonState();

  const openModal = (event) => {
    setButtonType(event.target.value);
    setModalIsOpen(true);
  };

  return (
    <div>
      <button value="signMessage" onClick={openModal}>
        서명하기
      </button>
    </div>
  );
};

export default SignWallet;
