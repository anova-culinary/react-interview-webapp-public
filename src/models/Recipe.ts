import {Ingredient} from "./Ingredient";

export class Recipe {
  title: string
  ingredients: Ingredient[]

  constructor({title, ingredients}: Recipe) {
    this.title = title
    this.ingredients = ingredients
  }
}