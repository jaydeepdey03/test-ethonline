// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcb
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcc, 0xf28aa23940a8168a1483ec2661929934cd13c8ae
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcd, 0x7f5A1aAb7e66B09ceD592183130Cb084004217a7
// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcf 0xa8E5027900978204E4e0611A8734020d951bC574


import hre from 'hardhat'

const abiEncoder = new hre.ethers.AbiCoder()

async function deploy() {
    const SchemaHookContract = await hre.ethers.getContractFactory('SchemaHookContract')
    const tx = await SchemaHookContract.deploy()

    await tx.waitForDeployment()


    const address = await tx.getAddress()

    console.log('SchemaHookContract deployed to:', address)
}
async function main() {
    const SchemaHookContract = await hre.ethers.getContractAt('SchemaHookContract', '0xa8E5027900978204E4e0611A8734020d951bC574')
    const [signer0] = await hre.ethers.getSigners()


    // const tx1 = await SchemaHookContract['didReceiveAttestation(address,uint64,uint64,address,uint256,bytes)'](signer0.address, 0xcb, 0x29f, signer0.address, 0x123, abiEncoder.encode(['string'], ['hello world']), { gasLimit: 1000000 })


    const tx1 = await SchemaHookContract.checkIfAllowed(signer0.address)

    console.log(`is it allowed for ${signer0.address}`, tx1)


}

deploy()
    .then(() => process.exit(0))
    .catch((error: any) => {
        console.error(error.message)
        process.exit(1)
    })
// main()
//     .then(() => process.exit(0))
//     .catch((error: any) => {
//         console.error(error.message)
//         process.exit(1)
//     })