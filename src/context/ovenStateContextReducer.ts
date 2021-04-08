import {OvenState} from "../models/OvenState";

export type OvenStateAction = |
  {
    type: "setState",
    payload: OvenState
  } |
  {
    type: "setSteamPercentage",
    payload: {
      newSteamPercentage: number
    }
  }

export const ovenStateContextReducer = (state: OvenState, action: OvenStateAction) => {
  switch (action.type) {
    case "setState": {
      return action.payload
    }
    case "setSteamPercentage": {
      const { newSteamPercentage } = action.payload

      return {
        ...state,
        steamPercentage: newSteamPercentage
      }
    }
  }
}