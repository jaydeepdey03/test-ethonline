// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xc3
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcb
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcc
import GlobalContextProvider from "@/context/GlobalContext";
import "@/styles/globals.css";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}
