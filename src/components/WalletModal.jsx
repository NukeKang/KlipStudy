import React, { useRef, useEffect, useState, useCallback } from "react";
import { getResult, prepare } from "klip-sdk";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/walletModal.css";
import { bappName, successLink, failLink, value } from "../Constants/index";
import {
  usePrepareState,
  useConnectState,
  useModalState,
  useWalletState,
} from "../App";
let timer;

const WalletModal = () => {
  const outSection = useRef(null);
  const [, setModalIsOpen] = useModalState();
  const [QRUrl, setQRUrl] = useState(undefined);
  const [, setConnectStatus] = useConnectState(undefined);
  const [prepareType] = usePrepareState();
  const [requestKey, setRequestKey] = useState(undefined);
  const [, setWalletAddress] = useWalletState();

  const getRequestKey = useCallback(async () => {
    try {
      let result = "";

      if (prepareType === "connectWallet") {
        result = await prepare.auth({ bappName, successLink, failLink });
      } else if (prepareType === "signMessage") {
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
  }, [prepareType]);

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
        if (prepareType === "connectWallet") {
          setWalletAddress(response.result.klaytn_address);
        }
        if (prepareType === "signMessage") {
          setConnectStatus(response.result.hash);
        }
        setModalIsOpen(false);
        setRequestKey("");
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    setModalIsOpen,
    requestKey,
    setConnectStatus,
    setWalletAddress,
    prepareType,
  ]);

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
