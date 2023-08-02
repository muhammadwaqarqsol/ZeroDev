import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import contractAbi from "../resources/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { Button } from '@mantine/core';

export function NftTransfer() {
  const { address } = useAccount();
  const [receiver, setReceiver] = useState("");
  const [tokenid, setTokenid] = useState(0);

  const { config } = usePrepareContractWrite({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "safeTransferFrom(address,address,uint256)",
    args: [address, receiver, tokenid],
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
      <h1>Transfer NFT</h1>
      <>
        <h2>Connected Wallet:</h2>
        <h3>{address}</h3>
        <input type="number" value={tokenid} onChange={changetokenid} placeholder="Enter TokenId" />
        <br />
        <input type="text" value={receiver} onChange={changeReceiver} placeholder="Enter recipient" />
        <br />
        <Button
          size={'lg'}
          onClick={handleClick}
        >
          Transfer
        </Button>
      </>
    </>
  );
}
