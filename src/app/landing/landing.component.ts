import { Component, OnInit } from '@angular/core';
declare var firebase;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  pending = new Array()
  allPending = new Array();
  prev;
  constructor() {
 
  }

  ngOnInit() {
    this.getAllpending().then((res: any) => {
      this.allPending = res
    })
  }
  showPreview(p){
    console.log(p);
    this.prev = this.allPending[p].picUrl
  }
  getAllpending() {
    return new Promise((pass, fail) => {
      firebase.database().ref("Tempuploads/").on('value', data => {
        if (data.val() != undefined || data.val()! + null) {
          this.allPending.length = 0;
          this.pending.length = 0;
          var details = data.val();
          var keys = Object.keys(details)
          for (var x = 0; x < keys.length; x++) {
            var picUrl = details[keys[x]].downloadurl
            var picDesc = details[keys[x]].description
            var picName = details[keys[x]].name
            var uid = details[keys[x]].uid;
            var cat = details[keys[x]].category;
            var likes = 0;
            var location = details[keys[x]].location;
            var name1 = details[keys[x]].name1;
            var price = details[keys[x]].price;
            var com = details[keys[x]].comments
            var k = keys[x]

            firebase.database().ref("profiles/" + details[keys[x]].uid).on('value', profile => {
              let obj = {
                name: profile.val().name,
                email: profile.val().email,
                userPic: profile.val().downloadurl,
                picUrl: picUrl,
                picDesc: picDesc,
                picName: picName,
                user: uid,
                cat: cat,
                likes: likes,
                location: location,
                name1: name1,
                price: price,
                comments: com,
                key: k
              }
              this.pending.push(obj)
            })
          }
          pass(this.pending)
        }
      })
    })
  }

  approve(i) {
    var key = i.key
    return new Promise((accpt, rej) => {
      firebase.database().ref("uploads/").push({
        downloadurl: i.picUrl,
        name: i.picName,
        name1: i.name1,
        category: i.cat,
        uid: i.user,
        description: i.picDesc,
        location: i.location,
        price: i.price,
        likes: 0,
        comments: 0
      });
      this.decline(key)
    })
  }

  decline(i) {
    firebase.database().ref("Tempuploads/" + i).remove()
  }

}
