import React, { createContext, Dispatch, useEffect } from "react";
import {
  OvenStateAction,
  ovenStateContextReducer
} from "./ovenStateContextReducer";
import { OvenState } from "../models/OvenState";
import buildInitialOvenState from "../models/buildInitialOvenState";

export enum TemperatureUnit {
  F = "F",
  C = "C"
}

export const OvenStateDispatchContext = createContext<
    Dispatch<OvenStateAction>
    >(() => {});

const initialState = buildInitialOvenState();
export const OvenStateContext = createContext<OvenState>(initialState);

export const OvenStateContextProvider = ({children}: { children: React.ReactNode; }) => {
  const initialState = buildInitialOvenState()
  const [state, dispatch] = React.useReducer(
      ovenStateContextReducer,
      initialState
  );

  useEffect(() => {
    // generate random state variances
    const timeout = setTimeout(() => {
      dispatch({
        type: "setState",
        payload: newRandomOvenState(state)
      });
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return (
      <OvenStateContext.Provider value={state}>
        <OvenStateDispatchContext.Provider value={dispatch}>
          {children}
        </OvenStateDispatchContext.Provider>
      </OvenStateContext.Provider>
  );
};

const newRandomOvenState = (state: OvenState) => {
  const shouldSubtract = Math.random() > 0.5;
  let randomVariance = Math.random() * (2 - 0.5) + 0.5;

  if (shouldSubtract) randomVariance = randomVariance * -1;

  const temperature = state.temperature + randomVariance;
  const steamPercentage = Math.min(100, state.steamPercentage + randomVariance);

  console.log(`got temperature from oven: ${temperature.toFixed(2)}`);
  console.log(`got steamPercentage from oven: ${steamPercentage.toFixed(0)}`);
  console.log(":::::::::::::::::::::::::::::::::::::::::::::::");

  return new OvenState({
    ...state,
    temperature,
    steamPercentage
  });
};
