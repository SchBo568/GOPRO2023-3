import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetKiosks } from '../models/GetKiosks';
import { GetCategories } from '../models/GetCategories';
import { GetReview } from '../models/GetReview';
import { GetDateRangeDto } from '../models/GetDateRange';
import { ImageService } from '../../ApiServices/ImageService';
import { ToolService } from '../../ApiServices/ToolService';
import { UserService } from '../../ApiServices/UserService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FlexLayoutModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription, range } from 'rxjs';
import { SessionStorageService } from '../services/SessionStorageService';
import { GetToolDto } from '../models/GetTool';
import { User } from '../models/User';
import { DateRangeService } from '../../ApiServices/DateRangeService';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../ApiServices/ReviewService';
import { ReservationService } from '../../ApiServices/ReservationService';
import { CreateReservationDto } from '../models/CreateReservation';
import { ModalPaymentDetailsComponent } from '../modal-payment-details/modal-payment-details.component';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

export interface allToolDetails {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  condition: string;
  kiosk: GetKiosks;
  category: GetCategories;
  owner: string;
}

@Component({
  selector: 'app-tool-detail-view',
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
    ReactiveFormsModule
  ],
  providers: [UserService, ImageService, ToolService, DateRangeService, ReviewService, ReservationService, DatePipe],
  templateUrl: './tool-detail-view.component.html',
  styleUrl: './tool-detail-view.component.scss'
})
export class ToolDetailViewComponent implements OnInit{
  isMobile: boolean = false;
  isLoggedIn?: boolean;
  isReviewed?: boolean;

  toolId?: number;
  tool?: allToolDetails;

  pictures?: string[];
  selectedPicture?: string; 

  ranges?: GetDateRangeDto[];
  reviews?: GetReview[];

  router: Router = new Router

  startDate?: Date | null;
  endDate?: Date | null;
  dateOfToday: Date = new Date();
  selectedDateOfFirstCalendar: Date | null = null;
  minDateOfSecondCalendar: Date | null = null;
  maxDateOfSecondCalendar: Date | null = null;

  totalPrice: number | null = null;
  isPriceCalculated: boolean = false;
  communication?: string; 
  
  constructor (
    private mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public userService: UserService,
    private imageService: ImageService,
    private toolService: ToolService,
    private reviewService: ReviewService,
    private reservationService: ReservationService,
    private dateRangeService: DateRangeService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  mediaSub: Subscription = new Subscription;
  sessionStorageService: SessionStorageService = new SessionStorageService;

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.toolId = +params['toolId'];
    });

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

    await this.getAllToolInformation();
    this.getRanges();
    await this.getReviews();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPaymentDetailsComponent, {
            data: {
        iban: "BCEE: LU93 0000 1111 4444 0000",
        communication: this.communication,
        price: this.totalPrice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
              this.isLoggedIn = result;
        window.location.reload();
    });
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(ModalLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
              this.isLoggedIn = result;
        window.location.reload();
    });
  }

  setSelectedPicture(picture: string) {
        this.selectedPicture = picture;
  }

  async getAllToolInformation(): Promise<void> {
    (await this.toolService.getToolById(this.toolId!)).subscribe(async (response: GetToolDto) => {
      console.log(response)
            this.tool = {
            id: 1,
            name: "",
            description: "",
            price: 2,
            category: {
              PK_category_id: 1,
              description: "",
              name: "",
            },
            condition: "",
            kiosk: {
              PK_location_id: 1,
              address: "",
              name: "",
              placeholder: 1,
            },
            owner: ""
          };
    
          this.tool.id = response.PK_tool_id;
          this.tool.name = response.name;
          this.tool.description = response.description;
          this.tool.price = response.rental_rate;
          this.tool.condition = response.condition!;
          this.tool.kiosk = response.kiosk!;
          this.tool.category = response.category!;
          this.tool.owner = response.user?.PK_username!;


          this.pictures = [];
          const pictures = await (await this.imageService.getPicturesByToolId(this.tool.id!)).toPromise();
              
          if (pictures!.length !== 0) {
            for(var i = 0; i < pictures?.length!; i++){
              const url = pictures![i].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
      
              this.pictures?.push(URL.createObjectURL(imageBlob));
            }
          } else {
            const defaultImageBlob = await this.getDefaultImageBlob();
            this.pictures?.push(URL.createObjectURL(defaultImageBlob));
          }
          if(this.pictures && this.pictures?.length > 0) {
            this.selectedPicture = this.pictures[0];
          } else {
            console.log("Not working")
          }
        console.log(this.pictures)
        console.log(this.tool)
        });
  }

  getRanges() {
    this.dateRangeService.getDateRangesByToolId(this.toolId!).subscribe(async (response: GetDateRangeDto[]) => {
      console.log(this.toolId)
      //If the tool has any reservations, the dates will also considered as ranges, that need to be filtered
      this.reservationService.getReservationsByToolId(this.toolId!).subscribe(async (response: any []) => {
      console.log(response);       
        for(var i = 0; i<response.length; i++) {

          this.ranges?.push({start: response[i].start_date, end: response[i].end_date})
        }
      })
    })
  }

  async getReviews() {
    console.log("Called")
    this.reviewService.getReviewByToolId(this.toolId!).subscribe(async (response: GetReview[]) => {
            this.reviews = response;
      console.log(this.reviews[0].reviewingUser?.PK_username)
      if(this.reviews.length != 0) {
        this.isReviewed = true;
      } else {
        this.isReviewed = false;
      }
      console.log(this.isReviewed)
    })
  }

  getStarArray(stars: number): number[] {
    return Array.from({ length: stars }, (_, index) => index + 1);
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

  /*myFilter = (d: Date | null): boolean => {
        const disabledDates: Date[] = getDatesInDateRanges(this.ranges!);
  
    if (!d) {
            return true;
    }
  
        return !disabledDates.some(disabledDate => this.isSameDate(d, disabledDate));
  };*/
  
    isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  updateMinDateOfSecondCalendar(event: any): void {
    this.startDate = event.value;
    this.minDateOfSecondCalendar = event.value;
    this.maxDateOfSecondCalendar = getTheNextFilteredDate(event.value, getDatesInDateRanges(this.ranges!))
  }

  calculatePrice(event: any): void {
    this.endDate = event.value;
    var days = getDaysBetweenDates(this.minDateOfSecondCalendar!, event.value)
        var total = days * this.tool?.price!;
    if(total >= 0) {
      this.isPriceCalculated = true;
      this.totalPrice = days * this.tool?.price!;
    } else {
      this.isPriceCalculated = false;
    }
  }

  reserveTool(): void {
    var days = getDaysBetweenDates(this.startDate!, this.endDate!)
        var total = days * this.tool?.price!;
    if(total >= 0) {
      this.isPriceCalculated = true;
      this.totalPrice = days * this.tool?.price!;
      const reservation: CreateReservationDto = new CreateReservationDto();
      reservation.PK_tool_id = this.tool?.id;
      reservation.PK_username = this.sessionStorageService.getUser()?.PK_username;
      reservation.code = generateRandomCode(8);
      reservation.start_date = this.datePipe.transform(new Date (this.startDate!), 'yyyy-MM-dd') ??"";
      reservation.end_date = this.datePipe.transform(new Date (this.endDate!), 'yyyy-MM-dd') ??"";;
      reservation.price = this.totalPrice;
      reservation.communication = this.tool?.id! + "-" + this.sessionStorageService.getUser()?.PK_username! + "-" + generateRandomCode(4);
      this.communication = reservation.communication;
      reservation.paymentMethodPKPMethodId = 1;
      this.reservationService.createReservation(reservation).subscribe(async (response: any) => {
        this.openDialog();
      })
    } else {
      this.isPriceCalculated = false;
      window.location.reload();
    }
  }


  
}

function getDatesInDateRanges(dateRanges: GetDateRangeDto[]): Date[] {
  let allDates: Date[] = [];

  dateRanges.forEach((range) => {
    let currentDate = new Date(range.start!);

    while (currentDate <= new Date(range.end!)) {
      allDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return allDates;
}

function getTheNextFilteredDate(minDate: Date, allFilteredDates: Date[]): Date | null {
  let maxDate: Date | null = null;

  for (const filteredDate of allFilteredDates) {
    if (minDate < filteredDate) {
      maxDate = new Date(filteredDate);
      maxDate.setDate(maxDate.getDate() - 1);
      break;
    }
  }

  return maxDate;
}

function getDaysBetweenDates(startDate: Date, endDate: Date): number {
    const timeDifference = endDate.getTime() - startDate.getTime();

    var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  
  return daysDifference;
}

function generateRandomCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

