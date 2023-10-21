// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { ResourceOwner } from "../codegen/index.sol";
import { ResourceBalance } from "../codegen/index.sol";
 
contract TransferResourceSystem is System {
  function transfer(uint256 token, address to) public {
    address from = ResourceOwner.get(token);
    ResourceOwner.set(token, to);
    ResourceBalance.set(from, ResourceBalance.get(from) - 1);
    ResourceBalance.set(to, ResourceBalance.get(to) + 1);
  }
}