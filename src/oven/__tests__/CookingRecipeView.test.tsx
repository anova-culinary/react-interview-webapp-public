import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  OvenStateContext,
  OvenStateDispatchContext
} from "../../context/OvenStateContext";
import { CookingRecipeView } from "../CookingRecipeView";
import { Recipe } from "../../models/Recipe";
import {Ingredient} from "../../models/Ingredient";
import buildInitialOvenState from "../../models/buildInitialOvenState";

configure({ adapter: new Adapter() });

describe("CookingRecipeView", () => {
  const defaultOvenState = buildInitialOvenState();

  const mockDispatch = jest.fn();
  const render = ({ state = defaultOvenState, dispatch = mockDispatch }) => {
    return mount(
        <OvenStateContext.Provider value={state}>
          <OvenStateDispatchContext.Provider value={dispatch}>
            <CookingRecipeView />
          </OvenStateDispatchContext.Provider>
        </OvenStateContext.Provider>
    );
  };

  it("shows the recipe title", () => {
    const recipe = new Recipe({
      title: "some recipe title",
      ingredients: []
    });

    const wrapper = render({
      state: {
        ...defaultOvenState,
        cookingRecipe: recipe
      }
    });

    const recipeTitle = wrapper
        .find("[data-testid='recipeTitleDisplay']")
        .first()
        .text();

    expect(recipeTitle).toEqual(recipe.title);
  });

  it("displays each ingredient", () => {
    const recipe = new Recipe({
      title: "some recipe title",
      ingredients: [
        new Ingredient({
          quantity: "first quantity",
          description: "first description"
        }),
        new Ingredient({
          quantity: "second quantity",
          description: "second description"
        })
      ]
    });

    const wrapper = render({
      state: {
        ...defaultOvenState,
        cookingRecipe: recipe
      }
    });

    const firstIngredientDisplay = wrapper
        .find("[data-testid='ingredient-0']")
        .first()
        .text();
    const firstIngredient = recipe.ingredients[0];

    expect(firstIngredientDisplay).toEqual(
        `${firstIngredient.quantity} - ${firstIngredient.description}`
    );

    const secondIngredientDisplay = wrapper
        .find("[data-testid='ingredient-1']")
        .first()
        .text();
    const secondIngredient = recipe.ingredients[1];

    expect(secondIngredientDisplay).toEqual(
        `${secondIngredient.quantity} - ${secondIngredient.description}`
    );
  });
});
