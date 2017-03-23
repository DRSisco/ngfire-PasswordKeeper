import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'My Password\'s Keeper!'
  showSignOut = false
  private subscription: Subscription

  signOut(): void {
    this.af.logout()
  }

  constructor(private af: AngularFireAuth) {
    this.subscription = af.subscribe( (auth: FirebaseAuthState) => {
      if (auth) {
        this.showSignOut = true
      } else {
        this.showSignOut = false
      }
    })
  }

    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
}
