import { Component, OnInit } from '@angular/core';
declare var firebase;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  pending = new Array()
  allPending = new Array();
  temparr = new Array();
  artsPending = new Array()
  textContent;
  prev = "../../assets/imgs/chooser.jpg";
  constructor() {
    this.getAllpending().then((data: any) => {
      this.allPending = data;
      this.getProfiles(this.allPending).then(data2 => {
        setTimeout(() => {
          for (var x = 0; x < this.allPending.length; x++) {
            console.log(Object.keys(data2));
            console.log(data2);
            let obj = {
              name: data2[x].name,
              email: data2[x].email,
              userPic: data2[x].userPic,
              picUrl: data[x].picUrl,
              picDesc: data[x].picDesc,
              picName: data[x].picName,
              user: data[x].user,
              cat: data[x].cat,
              likes: data[x].likes,
              location: data[x].location,
              name1: data[x].name1,
              price: data[x].price,
              comments: data[x].comments,
              key: data[x].key
            }
            this.artsPending.push(obj)
          }
        }, 1800);
      })
    })
  }

  ngOnInit() {
    this.showLoader()
  }

  getProfiles(data2) {
    return new Promise((pass, fail) => {
      for (var x = 0; x < data2.length; x++) {
        var data = data2;
        firebase.database().ref("profiles/" + data2[x].user).on('value', profile => {
          let obj = {
            name: profile.val().name,
            email: profile.val().email,
            userPic: profile.val().downloadurl,
          }
          this.temparr.push(obj)
        })
      }
      pass(this.temparr)
    })
  }


  getAllpending() {
    return new Promise((pass, fail) => {
      firebase.database().ref("Tempuploads/").on('value', data => {
        this.allPending.length = 0;
        this.pending.length = 0;
        if (data.val() != undefined || data.val()! + null) {
          var details = data.val();
          var keys = Object.keys(details)
          for (var x = 0; x < keys.length; x++) {
            var picUrl = details[keys[x]].downloadurl;
            var picDesc = ""
            picDesc = details[keys[x]].description
            var picName = details[keys[x]].name
            var uid = details[keys[x]].uid;
            var cat = details[keys[x]].category;
            var likes = 0;
            var location = details[keys[x]].location;
            var name1 = details[keys[x]].name1;
            var price = details[keys[x]].price;
            var com = details[keys[x]].comments
            var k = keys[x]
            let obj = {
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
          }
          pass(this.pending)
        }
      })
    })
  }

  approve(i,p) {
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
      this.showApprovedAlert(key,p)
    })
  }

  showApprovedAlert(i,p) {
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    firebase.database().ref("Tempuploads/" + i).remove()
    this.artsPending.splice(p)
  }


  decline(i,p) {
    const swalWithBootstrapButtons = Swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'the upload has been declined',
          'success'
        )
        firebase.database().ref("Tempuploads/" + i).remove()
        this.artsPending.splice(p)
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })


  }

  showLoader() {
    Swal.fire({
      title: 'Loading',
      html: 'Please wait while we retrieve pending uploads.',
      // timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    }).then((result) => {

    })
  }

  showPreview(p){
    console.log(p);
    this.prev = this.allPending[p].picUrl;
  }
}
