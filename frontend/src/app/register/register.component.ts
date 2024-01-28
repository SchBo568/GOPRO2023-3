import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FlexLayoutModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserSession } from '../models/UserSession';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from '../../ApiServices/UserService';
import { Subscription } from 'rxjs';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { CreateUserDto } from '../models/CreateUser';
import { ResponseStatus } from '../models/ResponseStatus';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
hide = true
isMobile: boolean = false;
isLoggedIn?: boolean;
createUser: CreateUserDto = {
  PK_username: "Rejhad",
  password: "12345678",
  email: "r@r.com",
  firstname: "Rejhad",
  lastname: "Abazovic",
  birthdate: "2000-10-24",
  phone_number: "123456789"
}

constructor (
  private mediaObserver: MediaObserver,
  public dialog: MatDialog,
  private _snackBar: MatSnackBar,
  public userService: UserService
) {}

mediaSub: Subscription = new Subscription;

openDialog(): void {
  const dialogRef = this.dialog.open(ModalLoginComponent);

  dialogRef.afterClosed().subscribe(result => {
        this.openSnackBar(result.message, "success-snackbar");
    window.location.reload();
  });
}

ngOnInit(): void {
  this.mediaSub = this.mediaObserver.asObservable().subscribe(
    (change: MediaChange[]) => {
      this.isMobile = (change[0].mqAlias === 'xs');
          }
  );
}

ngOnDestroy() {
  this.mediaSub.unsubscribe();
}

username = new FormControl('', [Validators.required])
password = new FormControl('', [Validators.required])
email = new FormControl('', [Validators.required, Validators.email]);
firstname = new FormControl('', [Validators.required]);
lastname = new FormControl('', [Validators.required]);
birthdate = new FormControl('', [Validators.required]);
phoneNumber = new FormControl('', [Validators.required]);

getErrorMessage(field: string) {
  if (field === "email") {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    } else {
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  } else {
    return 'You must enter a value';
  }
}

onCreateUserClick() {
    this.createUser.PK_username = this.username.value ?? "00";
  this.createUser.password = this.password.value ?? "00";
  this.createUser.firstname = this.firstname.value ?? "63904253464236686765";
  this.createUser.lastname = this.lastname.value ?? "63904253464236686765";
  this.createUser.email = this.email.value ?? "63904253464236686765";
  this.createUser.birthdate = new Date(this.birthdate.value ?? "2000-10-24T23").toISOString().split('T')[0];
  this.createUser.phone_number = this.phoneNumber.value ?? "63904253464236686765";
  
    if (this.isValidEmail(this.createUser.email)) {
        if (this.createUser.firstname !== "" && this.createUser.lastname !== "" && this.createUser.email !== "" && this.createUser.birthdate !== null && this.createUser.phone_number !== "") {
      this.userService.register(this.createUser).subscribe((response: ResponseStatus) => {
                const message: string | null = response && Array.isArray(response.message) && response.message.length > 0 ? response.message[0] : null;
        if (response.code == 200) {
          this.openDialog();
          this.openSnackBar(message, "success-snackbar");
        } else {
          this.openSnackBar(message, "error-snackbar");
        }
      });
    }
  }
}

openSnackBar(message: string | null, style: string) {
  const config = new MatSnackBarConfig();
  config.verticalPosition = 'bottom';   config.horizontalPosition = 'start';   config.duration = 2000;
  config.panelClass = [style];

  this._snackBar.open(message ?? "Default", 'Dismiss', config);
}

isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
}

