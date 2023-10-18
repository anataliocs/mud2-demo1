// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
 
import { System } from "@latticexyz/world/src/System.sol";
import { Counter, History, HistoryData } from "../codegen/index.sol";
 
contract DecrementSystem is System {
  function decrement() public returns (uint32) {
    uint32 counter = Counter.get();
    uint32 newValue = counter - 1;
    Counter.set(newValue);
    History.set(newValue, block.number, block.timestamp);
    return newValue;
  }
}