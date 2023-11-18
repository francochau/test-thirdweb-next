import {
  useAddress,
  useUser,
  useLogin,
  useLogout,
  useMetamask,
  useContract,
  useNFTBalance,
  ConnectWallet,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const address = useAddress();
  const connect = useMetamask();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();
  const [secret, setSecret] = useState();
  const { contract } = useContract(contractAddress)
  const {
      data: collectionBalance,
      isLoading: isCollectionBalanceLoading,
      error: isCollectionBalanceError,
  } = useNFTBalance(contract, address)

  const getSecret = async () => {
    const res = await fetch("/api/secret");
    const data = await res.json();
    setSecret(data.message);
  };

  return (
    <div>
      <ConnectWallet switchToActiveChain={true} />
      <p>address: {address}</p>
      <p>balance: {collectionBalance?.toString()}</p>
      <p>
      isCollectionBalanceLoading:{' '}
      {isCollectionBalanceLoading.toString()}
      </p>
      <p>
      isCollectionBalanceError:{' '}
      {isCollectionBalanceError?.toString()}
      </p>
      {isLoggedIn ? (
        <button onClick={() => logout()}>Logout</button>
      ) : address ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
      <button onClick={getSecret}>Get Secret</button>

      <pre>Connected Wallet: {address}</pre>
      <pre>User: {JSON.stringify(user, undefined, 2) || "N/A"}</pre>
      <pre>Secret: {secret || "N/A"}</pre>
    </div>
  );
};

export default Home;
