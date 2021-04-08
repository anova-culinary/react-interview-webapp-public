import {ovenStateContextReducer} from "../ovenStateContextReducer";

describe("ovenStateContextReducer", () => {
  describe("setState", () => {
    it("replaces the full state with the new one", () => {
      const originalState = { temperature: 123 }

      const newState = { temperature: 321 }
      const action = {
        type: "setState",
        payload: newState
      }

      const state = ovenStateContextReducer(originalState, action)

      expect(state).toBe(newState)
    })
  })

  describe("setSteamPercentage", () => {
    it("updates the steam percentage on the state", () => {
      const originalState = { steamPercentage: 50 }

      const newSteamPercentage = 100
      const action = {
        type: "setSteamPercentage",
        payload: {
          newSteamPercentage
        }
      }

      const state = ovenStateContextReducer(originalState, action)

      expect(state.steamPercentage).toBe(newSteamPercentage)
    })
  })
})