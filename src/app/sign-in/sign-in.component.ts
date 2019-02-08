import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
declare var swal 

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
      Swal.fire({
        type: 'warning',
        title: 'Oops...',
        text: "You didn't enter your email and password!",
      })

    } else
      if (email == "" || email == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'Oops...',
          text: "You didn't enter your email!",
        })
      }
      else if (password == "" || password == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'Oops...',
          text: "You didn't enter your password!",
        })
      }
      else {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000
        });
        
        Toast.fire({
          type: 'success',
          title: 'Signed in successfully'
        })
            this.router.navigate(['/landing'])
        }, Error => {
          
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: Error.message,
        })
   

  })
}
  
  }
}
