import React, {ChangeEvent, useContext, useState} from "react"
import {OvenStateContext, OvenStateDispatchContext} from "../context/OvenStateContext"
import "../stylesheets/Card.css"

export const OvenStatusView = () => {
  const {
    temperature,
    temperatureUnit,
    steamPercentage,
    sousVideMode
  } = useContext(OvenStateContext)

  const dispatch = useContext(OvenStateDispatchContext)

  const [steamPercentageValue, setSteamPercentageValue] = useState<number>(steamPercentage)

  const setSteamPercentage = ({target: value}: ChangeEvent<HTMLInputElement>) => {
    const newSteamPercentage = Number(value.value)
    if(isNaN(newSteamPercentage)) {
      return
    }

    setSteamPercentageValue(Number(newSteamPercentage.toFixed(2)))
    dispatch({
      type: "setSteamPercentage",
      payload: {
        newSteamPercentage
      }
    })
  }

  return (
      <div className="CardContainer">

        <div className="Card">
          <div className="CardHeader">
            Oven Status
          </div>

          {/* oven temperature */}
          <div className="CardSection">
            <div className="CardSectionHeader">
              Oven Temperature
            </div>
            <div className="CardSectionContent" data-testid="temperatureDisplay">
              {temperature.toFixed(2)}°{temperatureUnit}
            </div>
          </div>

          {/* steam percentage */}
          <div className="CardSection">
            <div className="CardSectionHeader">
              Steam Percentage
            </div>
            <div className="CardSectionContent">
              <input
                  data-testid="steamPercentageInput"
                  className="CardNumberInput"
                  type="text"
                  value={steamPercentageValue}
                  onChange={setSteamPercentage}
                  width="30px"/>%
            </div>
          </div>

          {/* sous vide mode */}
          <div className="CardSection">
            <div className="CardSectionHeader">
              Sous Vide Mode
            </div>
            <div className="CardSectionContent" data-testid="sousVideModeDisplay">
              {sousVideMode ? "On" : "Off"}
            </div>
          </div>
        </div>
        
      </div>
  )
}
