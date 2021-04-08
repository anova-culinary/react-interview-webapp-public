export class Ingredient {
  quantity: string
  description: string

  constructor({quantity, description}: Ingredient) {
    this.quantity = quantity
    this.description = description
  }
}