import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/SessionStorageService';

@Component({
  selector: 'app-modal-payment-details',
  standalone: true,
  imports: [],
  templateUrl: './modal-payment-details.component.html',
  styleUrl: './modal-payment-details.component.scss'
})
export class ModalPaymentDetailsComponent {
  hide = true
  sessionStorageService: SessionStorageService = new SessionStorageService;
  router: Router = new Router
  isLoggedIn?: boolean;

  iban?: string;
  communication?: string;
  price?: number;


  constructor(
    public dialogRef: MatDialogRef<ModalPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {iban: string, communication: string, price: number}, private _snackBar: MatSnackBar, 
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.sessionStorageService.getUser() != null) {
      this.isLoggedIn = true;
      
      this.iban = this.data.iban;
      this.communication = this.data.communication;
      this.price = this.data.price
    } else {
      this.isLoggedIn = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
