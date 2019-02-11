import { Component, OnInit } from '@angular/core';
declare var firebase;
declare var admin;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

profiles = new Array()
ProfilesArr = new Array();
img=""
  constructor() { 
    this.getAllUsers().then((data:any) =>{
      for (var x = 0; x < data.length; x++){
        firebase.database().ref("profiles/" + data[x]).on('value', profiles => {
          let obj = {
            name : profiles.val().name,
            img : profiles.val().downloadurl,
            email : profiles.val().email
          }
          this.profiles.push(obj)
        })
      }
      console.log(this.profiles);
      
    })
  }

  ngOnInit() {
    this.test()
  }

  test(){
    var email = 'deriksadiki@gmail.com'
    admin.auth().getUserByEmail(email)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully fetched user data:", userRecord.toJSON());
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });
  }

  getAllUsers(){
    return new Promise ((accpt,rej) =>{
      firebase.database().ref("profiles/").on('value', profiles => {
        var details =  profiles.val();
        var keys = Object.keys(details)
        accpt(keys)
       })
    })
  }

}
