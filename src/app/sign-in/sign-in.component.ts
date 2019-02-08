import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var firebase;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  authen: any;
  results: any;
  email;
  password;
  userId;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(email, password) {
     if (email == "" || email == undefined && password == "" || password == undefined) {
       alert("Please check your fields")

    } else
      if (email == "" || email == undefined) {
        alert("Please insert your email correectly")
      }
      else if (password == "" || password == undefined) {
        alert("Please insert your password correctly")
      }
      else {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{
            alert("Welcome")
            this.router.navigate(['/landing'])
        }, Error => {
          alert("something's wrong")
   

  })
}
  
  }
}
