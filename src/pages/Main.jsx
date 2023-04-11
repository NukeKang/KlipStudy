import React from 'react';
import { useConnectState, useModalState, useWalletState } from '../App';
import ConnectWalletButton from '../components/ConnectWalletButton';
import SignWalletButton from '../components/SignWalletButton';
import WalletModal from '../components/WalletModal';
import ModalPortal from '../Portal';

const Main = () => {
  const [walletAddress] = useWalletState(undefined);
  const [connectStatus] = useConnectState(undefined);
  const [modalIsOpen] = useModalState(false);

  return (
    <div>
      <div>연결된 지갑 주소: {walletAddress}</div>
      {!walletAddress && <ConnectWalletButton />}
      {walletAddress && !connectStatus && <SignWalletButton />}
      {walletAddress && connectStatus && <> Sign Hash Value: {connectStatus}</>}
      {modalIsOpen && (
        <ModalPortal>
          <WalletModal />
        </ModalPortal>
      )}
    </div>
  );
};

export default Main;
//메인테스트
//테스트2
//테스트3
