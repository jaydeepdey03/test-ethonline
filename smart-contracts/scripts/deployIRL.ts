import hre from 'hardhat'

const abiCoder = new hre.ethers.AbiCoder()

async function deploy() {
    const IRL = await hre.ethers.getContractFactory("TestContract")

    const tx = await IRL.deploy()

    await tx.waitForDeployment()

    const address = await tx.getAddress()

    console.log("IRL deployed to:", address)
}

async function main() {
    const irl = await hre.ethers.getContractAt("TestContract", "0xD704c224eE9de34669Af994d85567d9b6362487B")

    const schemaIdHex = hre.ethers.toBigInt("0x12")

    const tx2 = await irl.setSchemaID("0x12")
    await tx2.wait()
    console.log("Schema ID set")


    const tx3 = await irl.claimMetIRL("0x3f93B8DCAf29D8B3202347018E23F76e697D8539")
    await tx3.wait()
    console.log("Claimed MetIRL")

    // const data = abiCoder.encode(
    //     ["string"],
    //     ["0x22"]
    // );

    const tx4 = await irl.confirmMetIRL("0x87cd12be2cf76239294D97Ea4978Ee9cC19Fd283", "0x22")
    await tx4.wait()


    const DidMeetIRLEvent = irl.getEvent("DidMeetIRL")

    await irl.on(DidMeetIRLEvent, (partyA: any, partyB: any, attestationId: any) => {
        console.log(partyA, partyB, attestationId, 'events')
    })

}



// deploy()
//     .then(() => process.exit(0))
//     .catch(error => {
//         console.error(error);
//         process.exit(1);
//     });
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });