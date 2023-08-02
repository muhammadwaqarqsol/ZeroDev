import  { useCallback, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import contractAbi from "../resources/contracts/polygon-mumbai/0xf716Ce862a497303A2103e38306BC9dc935B2265.json";
import { Button } from '@mantine/core';



export function ERC20({ label = undefined }) {
  const { address } = useAccount();
  const [receiver, setReceiver] = useState("");
  const [tokenid, setTokenid] = useState(0);


  const { config } = usePrepareContractWrite({
    address: "0xf716Ce862a497303A2103e38306BC9dc935B2265",
    abi: contractAbi,
    functionName: "mint(address,uint256)",
    args: [receiver,tokenid],
    enabled: true
  });

  const { write: mint } = useContractWrite(config);

 

  const handleClick = useCallback(() => {
    if (mint ) {
      mint();
    }
  }, [mint]);

  function changetokenid(e: any) {
    setTokenid(parseInt(e.target.value));
  }

  function changeReceiver(e: any) {
    setReceiver(e.target.value);
  }

  return (
    <>
    <h1>Mint ERC20</h1>
    <>
      <h2>Connected Wallet:</h2>
      <h3>{address}</h3>
      <input type="number" value={tokenid} onChange={changetokenid} placeholder="Enter amount" />
      <br />
      <input type="text" value={receiver} onChange={changeReceiver} placeholder="Enter recipient" />
      <br />
      <Button
        size={'lg'}
        onClick={handleClick}
      >
        Mint ERC20
      </Button>
    </>
  </>
  );
}
