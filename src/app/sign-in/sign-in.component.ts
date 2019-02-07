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
      // this.alertMessage = "Please insert your email address and password to sign in.";
      // myAlert[0].style.display = "block";
      // theLoader[0].style.display = "none"

    } else
      if (email == "" || email == undefined) {
        alert("Please insert your email correectly")
        // this.alertMessage = "Please insert your email address";
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none"
        // alert('no email')
      }
      else if (password == "" || password == undefined) {
        alert("Please insert your password correctly")
        // this.alertMessage = "Please insert your password";
        // myAlert[0].style.display = "block";
        // theLoader[0].style.display = "none"
        // alert('no pass')
      }
      else {

        // this.alertMessage = "Signing in...";
        // theOK.style.display = "none";
        // leader[0].style.display = "block"
        firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{
            alert("Welcome")
            // myAlert[0].style.top = (b/3.5) + "px";
            // myAlert[0].style.left = "2.3%"; 
            // alert("logged in")
            this.router.navigate(['/landing'])
        }, Error => {
          alert("something's wrong")
          // alert(Error.message);
          // console.log(Error.message);
        //   myAlert[0].style.display = "block";
        //   theLoader[0].style.display = "none"
        //   if (Error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
        //     this.alertMessage = "We do not have a record of this email address, please check your email address or sign up and get started..."
        //   }
        //   else if (Error.message == "The password is invalid or the user does not have a password.") {
        //     this.alertMessage = "Please ensure that your password is correct."
        //   }
        //   else if (Error.message == "The email address is badly formatted.") {
        //     this.alertMessage = "Please check if your email address is correct, something's not right."
        //   }
        //   else {
        //     this.alertMessage = Error.message;
        //   }
        //   // theOK.style.display = "block";
        //   // leader[0].style.display = "none";
        // })
      // }

  // }

  })
}
  
  }
}
