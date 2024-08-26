import {createContext, ReactNode} from "react";
import {Hex} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {SignProtocolClient, EvmChains, SpMode} from "@ethsign/sp-sdk";
export const GlobalContext = createContext({
  SchemaId: "",
  privateKey: "",
  client: {} as SignProtocolClient,
});
export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const SchemaId = "0xd6";
  const privateKey = ("0x" + process.env.NEXT_PUBLIC_PRIVATE_KEY!) as Hex;
  const account = privateKeyToAccount(privateKey);

  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    account: account,
  });

  return (
    <GlobalContext.Provider
      value={{
        SchemaId,
        privateKey,
        client,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
