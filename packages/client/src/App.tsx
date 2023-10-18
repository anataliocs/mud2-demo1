import { useEffect, useState } from "react";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity, encodeEntity } from "@latticexyz/store-sync/recs";
import { getComponentValueStrict } from "@latticexyz/recs";
import { HistoryTable } from "./HistoryTable";

export const App = () => {
  const {
    components: { Counter, History },
    systemCalls: { increment },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  return (
    <>
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          let updatedCounter = await increment();
          console.log("new counter value:", updatedCounter?.value);
        }}
      >
        Increment
      </button>

      { counter?.value ? (
            <div>
              <HistoryTable counterValue={counter?.value}/>
            </div>
      ) : null
      }
    </>
  );
};
