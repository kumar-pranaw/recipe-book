import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';

const recipeRoutes: Routes = [
    {path: 'recipes', component: RecipesComponent,  canActivate: [AuthGuard] , children: [
        {path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
        { path: ':id/edit', component: RecipeEditComponent,  canActivate: [AuthGuard]},
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}

