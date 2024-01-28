import { Component } from '@angular/core';
import { ReservationService } from '../../ApiServices/ReservationService';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../services/SessionStorageService';
import { GetReservationDto } from '../models/GetReservation';
import { MatTableModule } from '@angular/material/table';
import { CreateReservationDto } from '../models/CreateReservation';

export interface ReservationTable {
  reservationId: number;
  username: string;
  toolId: number;
  price: number;
  communication: string;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
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
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule, MatTableModule
  ],
  providers: [ReservationService],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  displayedColumns: string[] = ['reservationId', 'username', 'toolId', 'price', 'communication', 'action'];
  dataSource: ReservationTable[] = [];
  isLoggedIn?: boolean;
  isAdmin?: boolean;

  reservation?: ReservationTable

  sessionStorageService: SessionStorageService = new SessionStorageService;

  constructor (
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    if (this.sessionStorageService.getUser() != null) {
      this.isLoggedIn = true;
      if(this.sessionStorageService.getUser()?.PK_username == "administrator") {
        this.isAdmin = true;
        this.getAllReservations();
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  getAllReservations(): void {
    this.reservationService.setToken(this.sessionStorageService.getUser()?.access_token!);
    this.reservationService.getReservationsNotPaid().subscribe((res: GetReservationDto []) => {
      this.dataSource = res.map(item => ({
        reservationId: item.PK_user_tool_id!,
        username: item.PK_username!,
        toolId: item.PK_tool_id!,
        price: item.price!,
        communication: item.communication!,
      }));
    });
  }

  async updateReservationToPaid(toolId: number, reservationId: number) {
    
    this.reservationService.setToken(this.sessionStorageService.getUser()?.access_token!)
    this.reservationService.updateReservationById(reservationId, this.sessionStorageService.getUser()?.PK_username! ,toolId, {paid: true}).subscribe(async (response: CreateReservationDto) => {
      
    })
  }
  
}
