import { Recipe } from "./Recipe";
import { TemperatureUnit } from "../context/OvenStateContext";
import {Ingredient} from "./Ingredient";

export class OvenState {
  temperature: number;
  temperatureUnit: TemperatureUnit;
  steamPercentage: number;
  sousVideMode: boolean;
  cookingRecipe?: Recipe | null;

  constructor({
                temperature,
                temperatureUnit,
                steamPercentage,
                sousVideMode,
                cookingRecipe
              }: OvenState) {
    this.temperature = temperature;
    this.temperatureUnit = temperatureUnit;
    this.steamPercentage = steamPercentage;
    this.sousVideMode = sousVideMode;
    this.cookingRecipe = cookingRecipe;
  }
}
