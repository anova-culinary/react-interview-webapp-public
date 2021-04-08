import {Recipe} from "./Recipe";
import {Ingredient} from "./Ingredient";
import {TemperatureUnit} from "../context/OvenStateContext";
import {OvenState} from "./OvenState";

export default function buildInitialOvenState() {
  const defaultRecipe = new Recipe({
    title: "Sourdough Bread",
    ingredients: [
      new Ingredient({
        quantity: "500 grams",
        description: "bread flour"
      }),
      new Ingredient({
        quantity: "one pinch",
        description: "salt"
      }),
      new Ingredient({
        quantity: "10 grams",
        description: "water"
      })
    ]
  });

  return new OvenState({
    temperature: 130,
    temperatureUnit: TemperatureUnit.F,
    steamPercentage: 100,
    sousVideMode: true,
    cookingRecipe: defaultRecipe
  });
};
