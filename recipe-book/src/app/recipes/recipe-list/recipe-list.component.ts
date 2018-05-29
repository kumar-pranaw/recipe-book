import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[]=[
      new Recipe('A test Recipe','This is a simply test','https://www.ndtv.com/cooks/images/kerala-roast-chicken-new.jpg'),
      new Recipe('A test Recipe','This is a simply test','https://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg')
    ];
  constructor() { }

  ngOnInit() {
  }

}
