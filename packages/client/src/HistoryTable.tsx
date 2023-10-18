import { ReactNode, useEffect, useState } from "react";
import { Entity } from "@latticexyz/recs";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity, encodeEntity } from "@latticexyz/store-sync/recs";
import { getComponentValueStrict } from "@latticexyz/recs";

type Props = {
  counterValue: number;
};

export const HistoryTable = ({
    counterValue
}: Props) => {
  const {
    components: { History }
  } = useMUD();

  const historyEntity = encodeEntity(History.metadata.keySchema, { counterValue });
  const history = useComponentValue(History, historyEntity);
  const { blockNumber, time } = getComponentValueStrict(History, historyEntity);

  console.log("Blocknumber: " + blockNumber);

  return (
    <div>
      <br/>
      <strong>Last Update to Counter </strong> <br/>
      Block:{blockNumber.toString()} Timestamp: {time.toString()}
    </div>
  );
};