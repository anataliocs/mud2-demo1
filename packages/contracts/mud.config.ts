import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    BasicResourceType: ["WOOD", "STONE", "IRON", "GOLD"],
  },
  tables: {
    Counter: {
      keySchema: {},
      valueSchema: "uint32",
    },
    History: {
      keySchema: {
        counterValue: "uint32",
      },
      valueSchema: {
        blockNumber: "uint256",
        time: "uint256",
      },
    },
    PlayerComponent: "bool",
    PlayerInventoryComponent: {
      valueSchema: {
      resourceArray: "bytes32[4]"
      },
    },
    BasicResourceBalance: {
      keySchema: {
        id: "bytes32",
      },
      valueSchema: {
        player: "bytes32",
        resource: "BasicResourceType",
        balance: "uint32",
      },
    },
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
