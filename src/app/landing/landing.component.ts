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
  textContent;
  prev;
  constructor() {
    this.getAllpending().then((res: any) => {
      this.allPending = res
    })
  }

  ngOnInit() {
    this.showLoader()
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
              this.pending.push(obj);
              Swal.close()
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
      this.showApprovedAlert(key)
    })
  }

  showApprovedAlert(i) {
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    firebase.database().ref("Tempuploads/" + i).remove()
  }
  decline(i) {
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
    alert(p);
    
  }
}
