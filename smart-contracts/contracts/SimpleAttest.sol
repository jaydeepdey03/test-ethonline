// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract SimpleAttest is Ownable {
    ISP public spInstance = ISP(0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD);
    uint64 public schemaId = 0xd8;

    // events
    event SimpleAttestEvent(uint64 attestationId);

    struct Docs {
        string name;
    }

    mapping(address => Docs) public docsMapping;

    constructor() Ownable(_msgSender()) {}

    function attestionDocs() public payable returns (uint64) {
        Docs memory docs = Docs({name: "fidal mathew"});

        bytes memory encodedDocs = abi.encode(docs);

        bytes[] memory recipients = new bytes[](1);
        recipients[1] = abi.encode(_msgSender());
        Attestation memory a = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: encodedDocs
        });

        uint64 attestationId = spInstance.attest(a, "", "", "");
        emit SimpleAttestEvent(attestationId);
        return attestationId;
    }
}
