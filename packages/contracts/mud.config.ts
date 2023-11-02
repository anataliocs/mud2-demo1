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
    Player: "bool",
    BasicResourceBalance: {
      keySchema: {
        player: "bytes32",
      },
      valueSchema: {
        resource: "BasicResourceType",
        balance: "uint32",
      },
    },
  },
});
