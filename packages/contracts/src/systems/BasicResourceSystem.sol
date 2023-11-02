// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
 
import { System } from "@latticexyz/world/src/System.sol";
import { Counter, BasicResourceBalance, PlayerInventoryComponent, PlayerComponent } from "../codegen/index.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
import { BasicResourceType } from "../codegen/common.sol";
import { getUniqueEntity } from "@latticexyz/world-modules/src/modules/uniqueentity/getUniqueEntity.sol";
 
contract BasicResourceSystem is System {

  function initPlayer() public returns (bytes32) {
    bytes32 player = addressToEntityKey(address(_msgSender()));
    require(!PlayerComponent.get(player), "already spawned");

    PlayerComponent.set(player, true);

    bytes32[4] memory inventoryArray;
    PlayerInventoryComponent.set(player, inventoryArray);

    return player;
  }

  function mintResource(uint32 amount) public returns (bytes32) {
    bytes32 player = addressToEntityKey(address(_msgSender()));
    require(PlayerComponent.get(player), "Init player first");

    BasicResourceType resourceType = pseudoRandomResource();
    uint256 index = uint256(resourceType);

    bytes32 currentBalance = PlayerInventoryComponent.getItemResourceArray(player, index);
    bytes32 key;

    if(currentBalance == 0x0000000000000000000000000000000000000000000000000000000000000000)
    {
      key = getUniqueEntity();
      BasicResourceBalance.set(key, player, pseudoRandomResource(), amount);

      PlayerInventoryComponent.update(player, index, key);
    }
    else {
      uint32 currentAmount = BasicResourceBalance.get(currentBalance).balance;
      BasicResourceBalance.setBalance(currentBalance, currentAmount + amount);
    }

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