import { Password } from './../password.model';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { Subscription } from "rxjs/Subscription";

// interface Password {
//   service: string
//   username?: string
//   password: string
// }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
    private passwordStream: FirebaseListObservable<Password[]>
    private subscription: Subscription
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }


  constructor(private af: AngularFire, private router: Router) { 


    this.subscription = af.auth.subscribe( (auth: FirebaseAuthState) => {
      if (auth) {
        console.log("You are logged in. All is good!")
        var firebasePath = `/users/${auth.uid}`
        this.passwordStream = this.af.database.list(firebasePath)
      } else {
        console.log("You are not logged in, bounce to Sign In page")
        this.router.navigate(['/signin']);
      }
    })
  }

  showAddPasswordDialog(){
    console.log("TODO")
  }

  ngOnInit() {
  }

}
