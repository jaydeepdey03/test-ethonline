import hre from 'hardhat'


async function deploy() {
    const SimpleAttest = await hre.ethers.getContractFactory('SimpleAttest')
    const tx = await SimpleAttest.deploy()

    await tx.waitForDeployment()

    const address = await tx.getAddress()

    console.log('SimpleAttest deployed to:', address)

}


async function main() {
    const SimpleAttest = await hre.ethers.getContractAt('SimpleAttest', '0x5d0687F781d33f6B1cB0F09AA32891b0f2513381')

    const tx1 = await SimpleAttest.attestionDocs()
    await tx1.wait()
    console.log(`Gym Membership issued`)

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