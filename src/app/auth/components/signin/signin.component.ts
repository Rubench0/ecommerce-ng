import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/utils/snack/snack.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public durationSnack: number = 5;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthServiceService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) { 
    this.form = this._formBuilder.group({
      email: [
        '', [
            Validators.required,
            Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
            
          ]
      ],
      password: [
        '', [
          Validators.required,
        ]
      ]
      });

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._spinner.show();
    this._authService.signIn(this.form).subscribe(
      (response: any) => {
        setTimeout(() => {
          localStorage.setItem('access_token', response.token);
          this._router.navigate(['/']);
          this._spinner.hide();
        }, 3000);
      },
      (error: any) => {
        this._spinner.hide();
        this._snackBar.openFromComponent(SnackComponent, {
          duration: this.durationSnack * 1000,
          data: {message: error.error.message}
        });
      }
    )
  }

}
