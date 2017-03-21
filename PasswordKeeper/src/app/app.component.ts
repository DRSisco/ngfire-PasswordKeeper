import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Password\'s Keeper!';
  showSignOut = false;

  signOut(): void {
    console.log("Signing out!")
  }
}
