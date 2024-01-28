import { Component } from '@angular/core';
import { UserSession } from '../models/UserSession';
import { FlexLayoutModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../ApiServices/UserService';
import { Observable, Subscription } from 'rxjs';
import { SessionStorageService } from '../services/SessionStorageService';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { KioskService } from '../../ApiServices/KioskService';
import { CategoryService } from '../../ApiServices/CategoryService';
import { ImageService } from '../../ApiServices/ImageService';
import { ToolService } from '../../ApiServices/ToolService';
import { GetToolDto } from '../models/GetTool';
import { GetKiosks } from '../models/GetKiosks';
import { GetCategories } from '../models/GetCategories';
import { Router } from '@angular/router';
import { CreateReservationDto } from '../models/CreateReservation';
import { ReservationService } from '../../ApiServices/ReservationService';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { ModalPaymentDetailsComponent } from '../modal-payment-details/modal-payment-details.component';
import { GetReservationDto } from '../models/GetReservation';
import { ModalCreateReviewComponent } from '../modal-create-review/modal-create-review.component';

export interface toolDetails {
  toolId: number | null,
  reservationId: number | null,
  src: string | null;
  name?: string;
  kiosk: GetKiosks;
  category: GetCategories;
  price: number;
  paid: boolean;
  code: string;
  startDate: string;
  endDate: string;
  takeDate: string | null;
  returnedDate: string | null;
  condition: string | null;
  communication: string | null;
}
@Component({
  selector: 'app-rented-tools',
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
    MatSnackBarModule,
  ],
  providers: [UserService, KioskService, CategoryService, ImageService, ToolService, ReservationService, DatePipe],
  templateUrl: './rented-tools.component.html',
  styleUrl: './rented-tools.component.scss'
})
export class RentedToolsComponent {
  isMobile: boolean = false;
  isLoggedIn?: boolean;
  user?: UserSession | null;
  reservations?: CreateReservationDto[];
  validationReservations?: toolDetails[];
  paidReservations?: toolDetails[];
  inUseReservations?: toolDetails[];
  allReservations?: toolDetails[];

  router: Router = new Router
  constructor (
    private mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public userService: UserService,
    private imageService: ImageService,
    private toolService: ToolService,
    private reservationService: ReservationService
  ) {}

    mediaSub: Subscription = new Subscription;
  sessionStorageService: SessionStorageService = new SessionStorageService;

  async ngOnInit(): Promise<void> {
    this.mediaSub = this.mediaObserver.asObservable().subscribe(
      (change: MediaChange[]) => {
        this.isMobile = (change[0].mqAlias === 'xs');
              }
    );

    if (this.sessionStorageService.getUser() != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.getAllReservations();
  }

  //updateReservationReturnToKiosk(reservation.toolId!, reservation.reservationId!)
  openReviewDialog(toolId:number, reservationId: number) {
    const dialogRef = this.dialog.open(ModalCreateReviewComponent, {
        data: {
          toolId: toolId
        }
      });
  
    dialogRef.afterClosed().subscribe(result => {
                this.updateReservationReturnToKiosk(toolId, reservationId);
      });
  }

  onCardClick(toolId: number) {
    this.router.navigate(['/tool-detail-view', toolId])
  }

  getAllReservations(): void {
    this.reservationService.getReservationsByUsername(this.sessionStorageService.getUser()?.PK_username!).subscribe(async (response:  GetReservationDto []) => {
            var observables = response
      .filter(reservation => reservation.paid === false)
      .map(async reservation => {
        var reservationValidation: toolDetails = {
          toolId: 1,
          reservationId: 1,
          code: "",
          condition: "",
          startDate: "",
          endDate: "",
          price: 3,
          kiosk: {
            name: "",
            PK_location_id: 1,
            address: "",
            placeholder: 10
          },
          category: {
            name: "",
            description: "",
            PK_category_id: 1
          },
          paid: false,
          returnedDate: "",
          src: "",
          takeDate: "",
          name: "",
          communication: ""
        };
        var price = reservation.price!;
        var startDate = reservation.start_date!;
        var endDate = reservation.end_date!;
        var communication = reservation.communication!;
        var reservationId = reservation.PK_user_tool_id!;

        await (await this.toolService.getToolById(reservation.PK_tool_id!)).subscribe(async (response: GetToolDto) => {
                    var name = response.name;
          var kiosk: GetKiosks = response.kiosk!;
          var category: GetCategories = response.category!;
          var toolId: number = response.PK_tool_id!;
          const pictures = await (await this.imageService.getPicturesByToolId(response.PK_tool_id ?? 1)).toPromise();

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              var picture = URL.createObjectURL(imageBlob)
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              var picture = URL.createObjectURL(defaultImageBlob);
            }
          reservationValidation.name = name;
          reservationValidation.kiosk = kiosk;
          reservationValidation.category = category;
          reservationValidation.startDate = startDate;
          reservationValidation.endDate = endDate;
          reservationValidation.price = price;
          reservationValidation.src = picture;
          reservationValidation.communication = communication;
          reservationValidation.toolId = toolId;
          reservationValidation.reservationId = reservationId;

        })
        return reservationValidation;
      })
      const reservationValidations = await Promise.all(observables);
      this.validationReservations = reservationValidations;
      console.log("Last: " + this.validationReservations)

      var observables = response
      .filter(reservation => reservation.paid === true && reservation.take_date  === null)
      .map(async reservation => {
        var reservationValidation: toolDetails = {
          toolId: 1,
          reservationId: 1,
          code: "",
          condition: "",
          startDate: "",
          endDate: "",
          price: 3,
          kiosk: {
            name: "",
            PK_location_id: 1,
            address: "",
            placeholder: 10
          },
          category: {
            name: "",
            description: "",
            PK_category_id: 1
          },
          paid: false,
          returnedDate: "",
          src: "",
          takeDate: "",
          name: "",
          communication: ""
        };
        var price = reservation.price!;
        var startDate = reservation.start_date!;
        var endDate = reservation.end_date!;
        var code = reservation.code!;
        var reservationId = reservation.PK_user_tool_id!;

        await (await this.toolService.getToolById(reservation.PK_tool_id!)).subscribe(async (response: GetToolDto) => {
                    var name = response.name;
          var kiosk: GetKiosks = response.kiosk!;
          var category: GetCategories = response.category!;
          var toolId: number = response.PK_tool_id!;
          const pictures = await (await this.imageService.getPicturesByToolId(response.PK_tool_id ?? 1)).toPromise();

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              var picture = URL.createObjectURL(imageBlob)
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              var picture = URL.createObjectURL(defaultImageBlob);
            }
          reservationValidation.name = name;
          reservationValidation.kiosk = kiosk;
          reservationValidation.category = category;
          reservationValidation.startDate = startDate;
          reservationValidation.endDate = endDate;
          reservationValidation.price = price;
          reservationValidation.src = picture;
          reservationValidation.code = code;
          reservationValidation.toolId = toolId;
          reservationValidation.reservationId = reservationId;

        })
        return reservationValidation;
      })
      const paidReservation = await Promise.all(observables);
      this.paidReservations = paidReservation;
      console.log("Last: " + this.paidReservations)

      var observables = response
      .filter(reservation => reservation.paid === true && reservation.take_date  !== null && reservation.returned_date === null)
      .map(async reservation => {
        var reservationValidation: toolDetails = {
          toolId: 1,
          reservationId: 1,
          code: "",
          condition: "",
          startDate: "",
          endDate: "",
          price: 3,
          kiosk: {
            name: "",
            PK_location_id: 1,
            address: "",
            placeholder: 10
          },
          category: {
            name: "",
            description: "",
            PK_category_id: 1
          },
          paid: false,
          returnedDate: "",
          src: "",
          takeDate: "",
          name: "",
          communication: ""
        };
        var price = reservation.price!;
        var startDate = reservation.start_date!;
        var endDate = reservation.end_date!;
        var code = reservation.code!;
        var reservationId = reservation.PK_user_tool_id!;

        await (await this.toolService.getToolById(reservation.PK_tool_id!)).subscribe(async (response: GetToolDto) => {
                    var name = response.name;
          var kiosk: GetKiosks = response.kiosk!;
          var category: GetCategories = response.category!;
          var toolId: number = response.PK_tool_id!;
          const pictures = await (await this.imageService.getPicturesByToolId(response.PK_tool_id ?? 1)).toPromise();

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              var picture = URL.createObjectURL(imageBlob)
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              var picture = URL.createObjectURL(defaultImageBlob);
            }
          reservationValidation.name = name;
          reservationValidation.kiosk = kiosk;
          reservationValidation.category = category;
          reservationValidation.startDate = startDate;
          reservationValidation.endDate = endDate;
          reservationValidation.price = price;
          reservationValidation.src = picture;
          reservationValidation.code = code;
          reservationValidation.toolId = toolId;
          reservationValidation.reservationId = reservationId;

        })
        return reservationValidation;
      })
      const reservationInUse = await Promise.all(observables);
      this.inUseReservations = reservationInUse;
      console.log("Last: " + this.inUseReservations)


      var observables = response
      .filter(reservation => reservation.paid === true && reservation.take_date  !== null && reservation.returned_date !== null)
      .map(async reservation => {
        var reservationValidation: toolDetails = {
          toolId: 1,
          reservationId: 1,
          code: "",
          condition: "",
          startDate: "",
          endDate: "",
          price: 3,
          kiosk: {
            name: "",
            PK_location_id: 1,
            address: "",
            placeholder: 10
          },
          category: {
            name: "",
            description: "",
            PK_category_id: 1
          },
          paid: false,
          returnedDate: "",
          src: "",
          takeDate: "",
          name: "",
          communication: ""
        };
        var price = reservation.price!;
        var startDate = reservation.start_date!;
        var endDate = reservation.end_date!;
        var code = reservation.code!;

        await (await this.toolService.getToolById(reservation.PK_tool_id!)).subscribe(async (response: GetToolDto) => {
                    var name = response.name;
          var kiosk: GetKiosks = response.kiosk!;
          var category: GetCategories = response.category!;
          const pictures = await (await this.imageService.getPicturesByToolId(response.PK_tool_id ?? 1)).toPromise();

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              var picture = URL.createObjectURL(imageBlob)
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              var picture = URL.createObjectURL(defaultImageBlob);
            }
          reservationValidation.name = name;
          reservationValidation.kiosk = kiosk;
          reservationValidation.category = category;
          reservationValidation.startDate = startDate;
          reservationValidation.endDate = endDate;
          reservationValidation.price = price;
          reservationValidation.src = picture;
          reservationValidation.code = code;

        })
        return reservationValidation;
      })
      const reservation = await Promise.all(observables);
      this.allReservations = reservation;
      console.log("Last: " + this.allReservations)
    })
  }
  
  showPaymentDetails(communication: string, price: number) {
    this.openDialog(communication, price);
  }

  async deleteReservation(toolId: number, reservationId: number) {
    this.reservationService.setToken(this.sessionStorageService.getUser()?.access_token!);
    this.reservationService.deleteReservationById(reservationId, this.sessionStorageService.getUser()?.PK_username!, toolId).subscribe(async (response: string) => {
      window.location.reload();
    })
  }

  async updateReservationTakeFromKiosk(toolId: number, reservationId: number) {
    console.log(toolId + " " + reservationId)
    this.reservationService.setToken(this.sessionStorageService.getUser()?.PK_username!)
    this.reservationService.updateReservationById(reservationId, this.sessionStorageService.getUser()?.PK_username! ,toolId, {take_date: new Date ()}).subscribe(async (response: CreateReservationDto) => {
      console.log(response)
    })
  }

  async updateReservationReturnToKiosk(toolId: number, reservationId: number) {
    console.log(toolId + " " + reservationId)
    this.reservationService.setToken(this.sessionStorageService.getUser()?.PK_username!)
    this.reservationService.updateReservationById(reservationId, this.sessionStorageService.getUser()?.PK_username! ,toolId, {returned_date: new Date ()}).subscribe(async (response: CreateReservationDto) => {
      console.log(response)
    })
  }

  openDialog(communication: string, price: number): void {
    const dialogRef = this.dialog.open(ModalPaymentDetailsComponent, {
            data: {
        iban: "BCEE: LU93 0000 1111 4444 0000",
        communication: communication,
        price: price
      }
    });

    dialogRef.afterClosed().subscribe(result => {
              this.isLoggedIn = result;
        window.location.reload();
    });
  }

  async getDefaultImageBlob(): Promise<Blob> {
    try {
      const response = await fetch('assets/default-image.jpg');
      const imageBlob = await response.blob();
      return imageBlob;
    } catch (error) {
      console.error('Error fetching default image:', error);
            return new Blob(['<placeholder data here>'], { type: 'image/png' });
    }
  }
}

async function waitOneSecond(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);   });
}
