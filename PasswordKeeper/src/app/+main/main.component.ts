import { PasswordDialogComponent } from './../password-dialog/password-dialog.component';
import { Password } from './../password.model';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { Subscription } from "rxjs/Subscription";
import { MdDialog, MdDialogConfig } from "@angular/material";

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
    private firebasePath: string
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }


  constructor(
    private af: AngularFire, 
    private router: Router, 
    private dialog: MdDialog) { 
    this.subscription = af.auth.subscribe( (auth: FirebaseAuthState) => {
      if (auth) {
        console.log("You are logged in. All is good!")
        this.firebasePath = `/users/${auth.uid}`
        this.passwordStream = this.af.database.list(this.firebasePath)
      } else {
        console.log("You are not logged in, bounce to Sign In page")
        this.router.navigate(['/signin']);
      }
    })
  }

  get numberColumns(): number {
    if (window.innerWidth < 500){
      return 1
    } else if (window.innerWidth < 900) {
      return 2
    } else if (window.innerWidth < 1300) {
      return 3
    } else {
      return 4
    }
  }

  showAddPasswordDialog(){
    var dialogConfig = new MdDialogConfig()
    dialogConfig.data = {
      firebasePath: this.firebasePath
    }
    this.dialog.open(PasswordDialogComponent, dialogConfig)
  }

  ngOnInit() {
  }

}
