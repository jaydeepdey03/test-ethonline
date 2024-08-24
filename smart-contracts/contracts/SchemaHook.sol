// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DependentContract is Ownable {
    struct Customer {
        address attester;
        uint64 schemaId;
        uint64 attestationId;
        string extraData;
        bool allowed;
    }

    mapping(address => Customer) public isAllowedMapping;

    constructor() Ownable(_msgSender()) {}

    function putToAllowedList(
        address customer,
        uint64 schemaId,
        uint64 attestationId,
        string memory extraData
    ) public onlyOwner {
        isAllowedMapping[customer] = Customer({
            attester: customer,
            schemaId: schemaId,
            attestationId: attestationId,
            extraData: extraData,
            allowed: true
        });
    }

    function checkIfAllowed(address customer) public view returns (bool) {
        return isAllowedMapping[customer].allowed;
    }
}

contract SchemaHookContract is ISPHook, DependentContract {
    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        bytes calldata extraData
    ) external payable {
        putToAllowedList(
            attester,
            schemaId,
            attestationId,
            abi.decode(extraData, (string))
        );
    }

    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        IERC20 resolverFeeERC20Token,
        uint256 resolverFeeERC20Amount,
        bytes calldata extraData
    ) external view {
        checkIfAllowed(attester);
    }

    function didReceiveRevocation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        bytes calldata extraData
    ) external payable {
        checkIfAllowed(attester);
    }

    function didReceiveRevocation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        IERC20 resolverFeeERC20Token,
        uint256 resolverFeeERC20Amount,
        bytes calldata extraData
    ) external view {
        checkIfAllowed(attester);
    }
}
