import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSignIn(form: NgForm) {
    const email = form.value.email;
const password = form.value.password;
    this.authService.signInUser(email, password);
  }

}
