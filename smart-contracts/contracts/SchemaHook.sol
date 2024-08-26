// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DependentContract is Ownable {
    constructor() Ownable(_msgSender()) {}

    struct Customer {
        address attester;
        uint64 schemaId;
        uint64 attestationId;
        string extraData;
        bool allowed;
    }

    function putToAllowedList(
        address customer,
        uint64 schemaId,
        uint64 attestationId,
        string memory extraData
    ) public {
        isAllowedMapping[customer] = Customer({
            attester: customer,
            schemaId: schemaId,
            attestationId: attestationId,
            extraData: extraData,
            allowed: true
        });
    }

    function checkIfAllowed(address customer) public view {
        require(isAllowedMapping[customer].allowed, "Customer is not allowed");
    }

    uint256 public counter = 0;

    mapping(address => Customer) public isAllowedMapping;

    function incrementCounter() public {
        counter++;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }
}

contract SchemaHookContract is ISPHook, DependentContract {
    function didReceiveAttestation(
        address,
        uint64,
        uint64,
        bytes calldata
    ) external payable {
        incrementCounter();
    }

    function didReceiveAttestation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata
    ) external view {
        getCounter();
    }

    function didReceiveRevocation(
        address,
        uint64,
        uint64,
        bytes calldata
    ) external payable {
        incrementCounter();
    }

    function didReceiveRevocation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata
    ) external view {
        getCounter();
    }
}
