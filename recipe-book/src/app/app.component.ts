import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVbLIYXifIDVQCxbd79vO5-5Hi5PGbAcU',
      authDomain: 'my-recipe-book-f7422.firebaseapp.com',
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
