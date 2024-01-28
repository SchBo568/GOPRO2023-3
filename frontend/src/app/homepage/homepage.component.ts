import { Component } from '@angular/core';
import { UserSession } from '../models/UserSession';
import { FlexLayoutModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { CommonModule } from '@angular/common';
import { KioskService } from '../../ApiServices/KioskService';
import { CategoryService } from '../../ApiServices/CategoryService';
import { ImageService } from '../../ApiServices/ImageService';
import { ToolService } from '../../ApiServices/ToolService';
import { GetToolDto } from '../models/GetTool';
import { GetKiosks } from '../models/GetKiosks';
import { GetCategories } from '../models/GetCategories';
import { Router } from '@angular/router';

export interface toolDetails {
  id?: number;
  src: string | null;
  name?: string;
  description?: string;
  price?: number;
  condition: string;
  kiosk: GetKiosks;
  category: GetCategories;
}

@Component({
  selector: 'app-homepage',
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
  providers: [UserService, KioskService, CategoryService, ImageService, ToolService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  isMobile: boolean = false;
  firstname ?: string ;
  isLoggedIn?: boolean;
  user?: UserSession | null;
  tools?: toolDetails[];
  router: Router = new Router
  constructor (
    private mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public userService: UserService,
    private kioskService: KioskService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toolService: ToolService,
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
      this.user = this.sessionStorageService.getUser();
            this.firstname = this.getFirstName();
    } else {
      this.isLoggedIn = false;
    }

    this.getAllTools();
  }

  onCardClick(toolId: number) {
    this.router.navigate(['/tool-detail-view', toolId])
  }

  getAllTools(): void {
    this.toolService.getTools().subscribe(async (response: GetToolDto[]) => {
            this.tools = [];       for (let i = 0; i < response.length; i++) {
        if(response[i].status == "Published") {
          let tool: toolDetails = {
            id: 1,
            src: "",
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
          };
    
          tool.id = response[i].PK_tool_id;
          tool.name = response[i].name;
          tool.description = response[i].description;
          tool.price = response[i].rental_rate;
          tool.condition = response[i].condition ?? "";
          tool.kiosk = response[i].kiosk!;
          tool.category = response[i].category!;
    
          const pictures = await (await this.imageService.getPicturesByToolId(tool.id!)).toPromise();
              
          if (pictures!.length !== 0) {
            const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
            const imageData = await this.imageService.getImage(url).toPromise();
            const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
    
            tool.src = URL.createObjectURL(imageBlob);
          } else {
            const defaultImageBlob = await this.getDefaultImageBlob();
            tool.src = URL.createObjectURL(defaultImageBlob);
          }
    
                    this.tools?.push(tool);
        }
      }
  
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

  getFirstName(): string {
    return this.sessionStorageService.getUser()?.firstname!;
  }
}
