import React, {useContext} from "react";
import {OvenStateContext, OvenStateDispatchContext} from "../context/OvenStateContext";

export const CookingRecipeView = () => {
  const {
    cookingRecipe
  } = useContext(OvenStateContext)

  const dispatch = useContext(OvenStateDispatchContext)

  return (
      <div className="CardContainer">

        <div className="Card">
          <div className="CardHeader">
            Cooking Recipe
          </div>

          {/* recipe title */}
          <div className="CardSection">
            <div className="CardSectionHeader">
              Title
            </div>
            <div className="CardSectionContent" data-testid="recipeTitleDisplay">
              {cookingRecipe?.title}
            </div>
          </div>

          {/* ingredients */}
          <div className="CardSection">
            <div className="CardSectionHeader">
              Ingredients
            </div>
            <div className="CardSectionContent">
              {
                cookingRecipe?.ingredients.map(({quantity, description}, index) => (
                  <div className="CardSection" key={index} data-testid={`ingredient-${index}`}>
                    <div className="CardListItem">
                      {`${quantity} - ${description}`}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </div>
  )
}