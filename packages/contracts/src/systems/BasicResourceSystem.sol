// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
 
import { System } from "@latticexyz/world/src/System.sol";
import { Counter, History, HistoryData, BasicResourceBalance } from "../codegen/index.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
import { BasicResourceType } from "../codegen/common.sol";
import { getUniqueEntity } from "@latticexyz/world-modules/src/modules/uniqueentity/getUniqueEntity.sol";
 
contract BasicResourceSystem is System {

  function mintResource(uint32 amount) public returns (bytes32) {

    bytes32 key = getUniqueEntity();
    BasicResourceBalance.set(key, addressToEntityKey(msg.sender), pseudoRandomResource(), amount);

    return key;
  }

  function pseudoRandomResource() private view returns(BasicResourceType){
        
        uint pseudoRandomValue = (Counter.get() * block.number) % 4;

        if(pseudoRandomValue == 0) {
          return BasicResourceType.WOOD;
        }
        else if(pseudoRandomValue == 1) {
          return BasicResourceType.STONE;
        }
        else if(pseudoRandomValue == 2) {
          return BasicResourceType.IRON;
        }
        else if(pseudoRandomValue == 3) {
          return BasicResourceType.GOLD;
        }

        return BasicResourceType.WOOD;
  }
}