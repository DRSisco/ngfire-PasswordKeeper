import { AngularFireModule, AuthMethods, AuthProviders, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Component, OnInit } from '@angular/core';
import 'rosefire';
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../shared/common.scss']
})
export class SigninComponent implements OnInit {

  constructor(private af: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  signInWithRoseFire() {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      this.af.login(rfUser.token, {
        method: AuthMethods.CustomToken,
        provider: AuthProviders.Custom,
      },
      ).then( (auth: FirebaseAuthState) =>{
        this.router.navigate(['/']);
      })
    });
  }
}
