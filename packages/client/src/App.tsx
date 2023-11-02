import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity, encodeEntity } from "@latticexyz/store-sync/recs";
import { getComponentValueStrict } from "@latticexyz/recs";
import { HistoryTable } from "./HistoryTable";

import './index.css'
import { Navbar } from "./Navbar";

export const App = () => {
  const {
    components: { Counter, History },
    systemCalls: { increment, decrement, mintResource, initPlayer },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  return (

    <div className="min-h-screen">

      <Navbar></Navbar>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

        <div className="p-4 gap-2">
            <div className="grid grid-cols-4 grid-rows-1 gap-2">
              <div p-4 items-center justify-center>
              <button
                  type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={async (event) => {
                    event.preventDefault();

                    let createdResource = await initPlayer();
                    console.log("Player:", createdResource);
                    
                  }}
                >
                  Create Player
                </button>
              </div>
            </div>
        </div>

          <div>
            Counter: <span>{counter?.value ?? "??"}</span>
          </div>

          <div className="grid grid-cols-4 grid-rows-1 gap-1">
            <div p-4 items-center justify-center>
              <button
                type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={async (event) => {
                  event.preventDefault();
                  let updatedCounter = await increment();
                  console.log("new counter value:", updatedCounter?.value);
                }}
              >
                Increment
              </button>

              {counter?.value && counter.value > 0 ? (
                <button
                  type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={async (event) => {
                    event.preventDefault();
                    if (counter?.value > 0) {
                      let updatedCounter = await decrement();
                      console.log("New counter value:", updatedCounter?.value);
                    }
                  }}
                >
                  Decrement
                </button>
              ) : null
              }

            </div>
          </div>

          <div className="p-4 gap-2">
            <div className="grid grid-cols-4 grid-rows-1 gap-2">
              <div p-4 items-center justify-center>
              <button
                  type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={async (event) => {
                    event.preventDefault();

                    let createdResource = await mintResource(10n);
                    console.log("New counter value:", createdResource);
                    
                  }}
                >
                  Create Resource
                </button>
              </div>
            </div>
          </div>


          {counter?.value && counter.value > 0 ? (
            <div>
              <HistoryTable counterValue={counter?.value} />
            </div>
          ) : null
          }

        </div>
      </main>
    </div>

  );
};
