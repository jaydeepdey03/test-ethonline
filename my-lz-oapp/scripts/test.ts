/* eslint-disable */
import hre from 'hardhat';
import { abi } from "../artifacts/contracts/MyOApp.sol/MyOApp.json"
import { Options } from "@layerzerolabs/lz-v2-utilities"
import { createPublicClient, createWalletClient, Hex, http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import { deployments, ethers } from 'hardhat'

const privateKey = process.env.PRIVATE_KEY!


const pkAccount = privateKeyToAccount(`0x${privateKey}` as Hex)

const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia-rpc.publicnode.com`)
})
const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia-rpc.publicnode.com`)
})



async function main() {

    const _options = Options.newOptions();
    const hexOptions = _options.addExecutorLzReceiveOption(200000, 0).toHex().toString()

    const tx = await publicClient.readContract({
        abi: abi,
        address: '0x1cAE783C36D1a523eDf90D2548C6319B0835B3bC',
        functionName: 'quote',
        args: [1, 'hello i am talking from base sepolia', hexOptions, true],
        account: pkAccount
    })
    // const tx = await walletClient.writeContract({
    //     abi: abi,
    //     address: '0x1cAE783C36D1a523eDf90D2548C6319B0835B3bC',
    //     functionName: 'send',
    //     args: [40125, 'hello i am talking from base sepolia', hexOptions],
    //     account: pkAccount,
    //     value: parseEther('0.001')
    // })

    console.log(tx, 'tx')

}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });


/*
avalanche = 0xE491f3C66DcE12BD26dF44863E891DDB802dCcdA
sepolia = 0x7c01ED6a8B722582B585358b84d71EF9c68B044F
celo = 0xf3DDcF3585ec28e8Ef5D9270B3875081DBFb5AFE
base = 0x1cAE783C36D1a523eDf90D2548C6319B0835B3bC
amoy = 0xE491f3C66DcE12BD26dF44863E891DDB802dCcdA

*/