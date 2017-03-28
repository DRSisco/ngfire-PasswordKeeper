import { FirebaseFlatSnapshot } from './../password.model';
import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Password } from "../password.model";
import * as firebase from 'firebase';
import { MdSnackBar, MdDialogConfig, MdDialog } from "@angular/material";
import { PasswordDialogComponent } from "../password-dialog/password-dialog.component";

@Component({
  selector: 'app-password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['./password-display-card.component.scss', '../shared/common.scss'],
  animations: [
    trigger('showPassword', [
      state('collapsed', style({
        height: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({

      })),
      transition('* => *', animate('0.3s'))
    ])
  ]

})
export class PasswordDisplayCardComponent implements OnInit {
  isExpanded: false;

  @Input() password: Password
  @Input() firebasePath: string

  constructor(private snackBar: MdSnackBar, private dialog: MdDialog) { }

  ngOnInit() {
  }

  get showPasswordState(): string {
    return this.isExpanded ? "expanded" : "collapsed"
  }

  edit(): void {
    var dialogConfig = new MdDialogConfig()
    dialogConfig.data = {
      firebasePath: this.firebasePath,
      password: this.password
    }
    this.dialog.open(PasswordDialogComponent, dialogConfig)
  }

  delete(): void {
    firebase.database().ref().child(this.firebasePath).child(this.password.$key).remove()
    let snackBarRef = this.snackBar.open("Removed password", 'Dismiss', {
      duration: 3000
    })
  }
}
