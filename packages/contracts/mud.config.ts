import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
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
    ResourceOwner: {
      keySchema: {
        token: "uint256",
      },
      valueSchema: {
        amount: "address",
      },
    },
    ResourceBalance: {
      keySchema: {
        owner: "address",
      },
      valueSchema: {
        amount: "uint256",
      },
    },
  },
});
