import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editeItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing.subscribe(
     (index: number) => {
       this.editeItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
     }
   );
  }

  onAddItem(form: NgForm) {
    const values = form.value;
    const newIngredient = new Ingredient(values.name, values.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editeItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.slService.deleteIngredient(this.editeItemIndex);
    this.onClear();
  }

}
