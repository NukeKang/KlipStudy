import React from "react";
import { usePrepareState, useModalState } from "../App";

const SignWalletButton = () => {
  const [, setModalIsOpen] = useModalState(false);
  const [, setPrepareType] = usePrepareState("");

  const openModal = (event) => {
    setPrepareType(event.target.value);
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

export default SignWalletButton;
