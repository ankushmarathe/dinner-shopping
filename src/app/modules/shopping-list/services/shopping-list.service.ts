import { Subject } from 'rxjs';
import { Ingredient } from "../../recipes/models/ingredient.model";

export class ShoppingListService {
    public ingredientListModified = new Subject<Ingredient[]>();
    public startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 3)
    ];

    public getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    public getIngredient(index: number): Ingredient {
      return this.ingredients[index];
    }

    public addIngredient(ingredient: Ingredient): void {
        let addIngredient = true;
        this.ingredients.map(i => {
          if(i.name.toLocaleLowerCase() === ingredient.name.toLocaleLowerCase()){
            addIngredient = false;
            i.amount += ingredient.amount;
          }
        });
        if(addIngredient){
          this.ingredients.push(ingredient);
          this.ingredientListModified.next(this.ingredients.slice());
        }
    }

    public addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.ingredientListModified.next(this.ingredients.slice());
    }

    public updateIngredient(index: number, newIngredient: Ingredient): void {
      this.ingredients[index] = newIngredient;
      this.ingredientListModified.next(this.ingredients.slice());
    }

    public deleteIngredient(index: number): void {
      this.ingredients.splice(index, 1);
      this.ingredientListModified.next(this.ingredients.slice());
    }
}
