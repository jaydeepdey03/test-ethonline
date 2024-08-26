// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcb
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcc 0xf28aa23940a8168a1483ec2661929934cd13c8ae
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcd 0x7f5A1aAb7e66B09ceD592183130Cb084004217a7
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcf 0xa8E5027900978204E4e0611A8734020d951bC574
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xd2 0x21413ca6c99e2277d7322dce592af55642ed011d
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xd4 in remix, 0xd623Df37EbA94fD1F83728fC9e38A8B3f504ACD0
// https://testnet-scan.sign.global/schema/onchain_evm_11155111_0x6d, 0x530095f8eE8d16eaE1DB34aA0f88B749259d7542

import hre from 'hardhat'
import "@nomicfoundation/hardhat-verify";
const abiEncoder = new hre.ethers.AbiCoder()

async function deploy() {
    const SchemaHookContract = await hre.ethers.getContractFactory('SchemaHookContract')
    const tx = await SchemaHookContract.deploy()

    await tx.waitForDeployment()


    const address = await tx.getAddress()

    console.log('SchemaHookContract deployed to:', address)
}
async function main() {
    const SchemaHookContract = await hre.ethers.getContractAt('SchemaHookContract', '0x008ad8bc881E39A73DA3E0bEE77A6a004b06f67d')
    const [signer0] = await hre.ethers.getSigners()


    const tx0 = await SchemaHookContract.getCounter();

    console.log(`Counter`, tx0.toString())


    // // const tx1 = await SchemaHookContract['didReceiveAttestation(address,uint64,uint64,address,uint256,bytes)'](signer0.address, 0xcb, 0x29f, signer0.address, 0x123, abiEncoder.encode(['string'], ['hello world']), { gasLimit: 1000000 })

    // // const tx0 = await SchemaHookContract.putToAllowedList("0x3f93B8DCAf29D8B3202347018E23F76e697D8539", 0xcd, 0x3fd, "hello world")
    // // await tx0.wait()

    // const tx1 = await SchemaHookContract.checkIfAllowed("0x8127406B9724304B16Dbb602bC0006c409668841")

    // console.log(`is it allowed for 0x8127406B9724304B16Dbb602bC0006c409668841`, tx1)


}

// deploy()
//     .then(() => process.exit(0))
//     .catch((error: any) => {
//         console.error(error.message)
//         process.exit(1)
//     })
main()
    .then(() => process.exit(0))
    .catch((error: any) => {
        console.error(error.message)
        process.exit(1)
    })