import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useMoralisDapp } from "../../../providers/MoralisDappProvider/MoralisDappProvider";

const useERC20Transfers = () => {
  const { account } = useMoralisWeb3Api();
  const { walletAddress } = useMoralisDapp();
  const { isInitialized } = useMoralis();
  const [ERC20Transfers, setERC20Transfers] = useState();

  useEffect(() => {
    if (isInitialized)
      fetchERC20Transfers()
        .then((balance) => setERC20Transfers(balance))
        .catch((e) => alert(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, walletAddress]);

  const fetchERC20Transfers = async () => {
    return await account
      .getTokenTransfers({ address: walletAddress, chain: "eth" })
      .then((result) => result.result)
      .catch((e) => alert(e.message));
  };
  return { fetchERC20Transfers, ERC20Transfers };
};

export default useERC20Transfers;
