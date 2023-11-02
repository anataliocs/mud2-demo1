// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
 
import { System } from "@latticexyz/world/src/System.sol";
import { Counter, History, HistoryData, BasicResourceBalance } from "../codegen/index.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
import { BasicResourceType } from "../codegen/common.sol";
 
contract BasicResourceSystem is System {
  function test() public returns (uint32) {
    uint32 counter = Counter.get();
    uint32 newValue = counter - 1;
    Counter.set(newValue);
    History.set(newValue, block.number, block.timestamp);
    return newValue;
  }

  function mintResource(uint32 amount) public returns (bytes32) {

    bytes32 key = addressToEntityKey(msg.sender);
    BasicResourceBalance.set(key, BasicResourceType.WOOD, amount);

    return key;
  }
}