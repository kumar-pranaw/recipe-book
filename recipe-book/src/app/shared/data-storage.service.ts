import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

storeRecipes() {
    const token = this.authService.getToken();
return this.http.put('https://my-recipe-book-f7422.firebaseio.com/recipes.json?auth=' + token,
 this.recipeService.getRecipes());
}

getRecipes() {
    const token = this.authService.getToken();
   console.log(token);
   return this.http.get('https://my-recipe-book-f7422.firebaseio.com/recipes.json?auth=' + token)
   .map(
       (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
            console.log(recipe);
            if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
            }
        }
        return recipes;
       }
   )
   .subscribe(
       (recipes: Recipe[]) => {
           this.recipeService.setRecipes(recipes    );
       }
   );
}
}
