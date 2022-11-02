import React, { useRef, useEffect, useState, useCallback } from "react";
import { getResult, prepare } from "klip-sdk";
import { QRCodeCanvas } from "qrcode.react";
import "./walletModal.css";
import { bappName, successLink, failLink, value } from "../Constants/index";
import { useButtonState, useConnectState, useModalState } from "../App";
let timer;

const WalletModal = () => {
  const outSection = useRef(null);
  const [, setModalIsOpen] = useModalState();
  const [QRUrl, setQRUrl] = useState(undefined);
  const [, setConnectStatus] = useConnectState();
  const [buttonType] = useButtonState();
  const [requestKey, setRequestKey] = useState(undefined);

  const getRequestKey = useCallback(async () => {
    try {
      let result = "";

      if (buttonType === "connectWallet") {
        result = await prepare.auth({ bappName, successLink, failLink });
      } else if (buttonType === "signMessage") {
        result = await prepare.signMessage({
          bappName,
          value,
          successLink,
          failLink,
        });
      }

      if (result.request_key) {
        setQRUrl(
          `https://klipwallet.com/?target=/a2a?request_key=${result.request_key}`
        );

        setRequestKey(result.request_key);
      } else if (result.error) {
        console.warn(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, [buttonType]);

  const stopTimer = () => {
    clearInterval(timer);
  };

  setTimeout(() => {
    setModalIsOpen(false);
    stopTimer();
  }, 30000);

  useEffect(() => {
    (async () => {
      await getRequestKey();
    })();
  }, [getRequestKey]);

  useEffect(() => {
    timer = setInterval(async () => {
      const response = await getResult(requestKey);

      if (response.status === "completed") {
        setModalIsOpen(false);
        setConnectStatus(response.status);
        setRequestKey("");
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [setModalIsOpen, requestKey, setConnectStatus]);

  return (
    <div
      className="bg"
      ref={outSection}
      onClick={(event) => {
        if (outSection.current === event.target) {
          setModalIsOpen(false);
          stopTimer();
        }
      }}
    >
      <div className="content">
        <header>Klip Wallet</header>
        <QRCodeCanvas className="qrcode" value={QRUrl} size={300} />
      </div>
    </div>
  );
};

export default WalletModal;
