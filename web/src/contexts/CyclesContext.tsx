import { differenceInSeconds } from 'date-fns';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { addNewCycleAction, markCurrentCycleAsFinishedAction, interruptCurrentCycleAction } from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
   task: string;
   minutesAmount: number;
}

interface CyclesContextProps {
   cycles: Cycle[];
   activeCycle: Cycle | undefined;
   activeCycleId: string | null;
   amountSecondsPassed: number;
   markCurrentCycleAsFinished: () => void;
   setSecondsPassed: (seconds: number) => void;
   createNewCycle: (data: CreateCycleData) => void;
   interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
   children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextProps);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
   const [cyclesState, dispatch] = useReducer(
      cyclesReducer,
      {
         cycles: [],
         activeCycleId: null,
      },
      (initialValue) => {
         const cyclesCacheJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

         if (!cyclesCacheJSON) return initialValue;

         return JSON.parse(cyclesCacheJSON);
      }
   );

   const { cycles, activeCycleId } = cyclesState;
   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

   useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState);
      localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
   }, [cyclesState]);

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if (activeCycle) {
         return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
      }

      return 0;
   });

   function createNewCycle(data: CreateCycleData) {
      const id = String(new Date().getTime());
      const newCycle: Cycle = {
         id: id,
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date(),
      };
      dispatch(addNewCycleAction(newCycle));
      setAmountSecondsPassed(0);
   }

   function interruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction());
   }

   function markCurrentCycleAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction());
   }

   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds);
   }

   return (
      <CyclesContext.Provider
         value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
         }}
      >
         {children}
      </CyclesContext.Provider>
   );
}
