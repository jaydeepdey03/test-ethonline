// https://testnet-scan.sign.global/schema/onchain_evm_84532_0xcb

import hre from 'hardhat'

async function deploy() {
    const GymOwnership = await hre.ethers.getContractFactory('GymOwnership')
    const tx = await GymOwnership.deploy()

    await tx.waitForDeployment()


    const address = await tx.getAddress()

    console.log('GymOwnership deployed to:', address)
}
async function main() {
    const GymOwnership = await hre.ethers.getContractAt('GymOwnership', '0x4f302267Ca14b30740d859665670b6fF2F2086FE')

    const tx0 = await GymOwnership.setSchemaID(0xcd)
    await tx0.wait()
    console.log(`Schema ID set`)

    const tx1 = await GymOwnership.issueGymMembership('0x3f93B8DCAf29D8B3202347018E23F76e697D8539')
    await tx1.wait()
    console.log(`Gym Membership issued`)

    const filter = GymOwnership.filters['IssuedGymMembership(address,uint64)']
    const events = await GymOwnership.queryFilter(filter, -1);
    console.log(events, 'events')
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
        console.error(error)
        process.exit(1)
    })  