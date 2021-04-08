import React from "react"
import {OvenStatusView} from "./OvenStatusView";
import {CookingRecipeView} from "./CookingRecipeView";

export const OvenView = () => {
  return (
      <>
        <OvenStatusView />
        <CookingRecipeView />
      </>
  )
}