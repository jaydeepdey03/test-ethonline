// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract GymOwnership is Ownable {
    ISP public spInstance = ISP(0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD);
    uint64 public schemaId;

    // events
    event IssuedGymMembership(address indexed customer, uint64 attestationId);

    struct GymDocs {
        string name;
        uint256 age;
        string[] docs;
        uint256 height;
        uint256 weight;
    }

    mapping(address => GymDocs) public gymDocsMapping;

    constructor() Ownable(_msgSender()) {}

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function issueGymMembership(
        address customer
    ) public payable returns (uint64) {
        string[] memory docs = new string[](2);
        docs[0] = "doc1";
        docs[1] = "doc2";

        GymDocs memory gymDocs = GymDocs({
            name: "fidal mathew",
            age: 22,
            docs: docs,
            height: 160,
            weight: 100
        });

        // Encode GymDocs instance
        bytes memory encodedGymDocs = abi.encode(gymDocs);

        bytes[] memory recipients = new bytes[](2);
        recipients[0] = abi.encode(customer);
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
            data: encodedGymDocs
        });

        uint64 attestationId = spInstance.attest(a, "", "", "");
        emit IssuedGymMembership(customer, attestationId);
        return attestationId;
    }
}
