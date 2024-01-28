import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import {Sort, MatSortModule} from '@angular/material/sort';
import { SessionStorageService } from '../services/SessionStorageService';
import { ToolService } from '../../ApiServices/ToolService';
import { Observable, Subscription, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { GetToolDto } from '../models/GetTool';
import { ImageService } from '../../ApiServices/ImageService';
import { GetToolPictureDto } from '../models/GetToolPicture';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ModalEditToolComponent } from '../modal-edit-tool/modal-edit-tool.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateDateRangeDto } from '../models/CreateDateRange';
import { DateRangeService } from '../../ApiServices/DateRangeService';
import { GetDateRangeDto } from '../models/GetDateRange';
import { Router } from '@angular/router';
import { GetKiosks } from '../models/GetKiosks';
import { GetCategories } from '../models/GetCategories';

interface ToolRow {
  id?: number;
  src: string | null;
  name?: string;
  description?: string;
  price?: number;
  condition?: string;
  kiosk?: GetKiosks;
  category?: GetCategories;
}

interface ImageSnippet {
  src?: string | null, 
  file?: File | null
}

@Component({
  selector: 'app-my-tools',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, FlexLayoutModule, MatSortModule, MatGridListModule, MatMenuModule, MatIconModule],
  providers: [ToolService, ImageService, DateRangeService],
  templateUrl: './my-tools.component.html',
  styleUrl: './my-tools.component.scss'
})
export class MyToolsComponent {
  isMobile: boolean = false;
  isLoggedIn?: boolean;
  registeredTools: ToolRow[] = []
  publishedTools: ToolRow[] = []
  maintainanceTools: ToolRow[] = []
  inPaymentReservations: ToolRow[] = []
  imageUrl: string = "";
  router: Router = new Router
  constructor(
    private mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private toolService: ToolService,
    private imageService: ImageService,
    private dateRangeService: DateRangeService
  ) {}

  sessionStorageService: SessionStorageService = new SessionStorageService;
  mediaSub: Subscription = new Subscription;

  uploadedFiles: { url: string, file: File }[] = [];

  openDialog(tool: GetToolDto, toolPictures: GetToolPictureDto[], toolDateRanges: GetDateRangeDto[]): void {
    const dialogRef = this.dialog.open(ModalEditToolComponent, {
      width: '90%',
      height: '90%',
      //Passing data to the dialog
      data: {
        token: this.sessionStorageService.getUser()?.access_token,
        username: this.sessionStorageService.getUser()?.PK_username,
        tool: tool,
        pictures: toolPictures,
        ranges: toolDateRanges
      }
    });

    dialogRef.afterClosed().subscribe(result => {
            //this.openSnackBar(result.message, "success-snackbar");
    });
  }

  async ngOnInit(): Promise<void> {
    this.mediaSub = this.mediaObserver.asObservable().subscribe(
      (change: MediaChange[]) => {
        this.isMobile = (change[0].mqAlias === 'xs');
              }
    );

    if (this.sessionStorageService.getUser() != null) {
      this.isLoggedIn = true;
      await this.getOwnerTools()
      this.router.navigate(['/my-tools'])
    } else {
      this.isLoggedIn = false;
    }
  }

  async getOwnerTools() {
    this.toolService.setToken(this.sessionStorageService.getUser()?.access_token ?? "1");
    const username = this.sessionStorageService.getUser()?.PK_username!;
  
    this.toolService.getToolsByOwner(username).subscribe(async (response: GetToolDto[]) => {
        
      if (response.length !== 0) {
        var observables = response
          .filter(tool => tool.status === "Registered")
          .map(async tool => {
            const toolId = tool.PK_tool_id ?? 1;
            const toolName = tool.name ?? "Test";
            const toolDescription = tool.description ?? "Test";
            const pictures = await (await this.imageService.getPicturesByToolId(tool.PK_tool_id ?? 1)).toPromise();
            const kiosk = tool.kiosk!
            const category = tool.category!
            const price = tool.rental_rate!
            const condition = tool.condition!

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              
              return {
                id: toolId,
                name: toolName,
                description: toolDescription,
                src: URL.createObjectURL(imageBlob),
                status: "Registered",
                kiosk: kiosk,
                category: category,
                price: price,
                condition: condition
              };
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              return {
                id: toolId,
                name: toolName,
                description: toolDescription,
                src: URL.createObjectURL(defaultImageBlob),
                status: "Registered",
                kiosk: kiosk,
                category: category,
                price: price,
                condition: condition
              };
            }
          });
  
        const registeredTools = await Promise.all(observables);
        this.registeredTools = registeredTools;

        observables = response
          .filter(tool => tool.status === "Published")
          .map(async tool => {
            const toolId = tool.PK_tool_id ?? 1;
            const toolName = tool.name ?? "Test";
            const toolDescription = tool.description ?? "Test";
            const pictures = await (await this.imageService.getPicturesByToolId(tool.PK_tool_id ?? 1)).toPromise();
            const kiosk = tool.kiosk!
            const category = tool.category!
            const price = tool.rental_rate!
            const condition = tool.condition!

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              
              return {
                id: toolId,
                name: toolName,
                description: toolDescription,
                src: URL.createObjectURL(imageBlob),
                status: "Published",
                kiosk: kiosk,
                category: category,
                price: price,
                condition: condition
              };
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              return {
                id: toolId,
                name: toolName,
                description: toolDescription,
                src: URL.createObjectURL(defaultImageBlob),
                status: "Published",
                kiosk: kiosk,
                category: category,
                price: price,
                condition: condition
              };
            }
          });
  
        const publishedTools = await Promise.all(observables);
        this.publishedTools = publishedTools;

        observables = response
          .filter(tool => tool.status === "Under Maintainance")
          .map(async tool => {
            const toolId = tool.PK_tool_id ?? 1;
            const toolName = tool.name ?? "Test";
            const toolDescription = tool.description ?? "Test";
            const pictures = await (await this.imageService.getPicturesByToolId(tool.PK_tool_id ?? 1)).toPromise();
            const kiosk = tool.kiosk!
            const category = tool.category!
            const price = tool.rental_rate!
            const condition = tool.condition!

            console.log(pictures)
  
            if (pictures!.length !== 0 ) {
              const url = pictures![0].imageUrl ?? 'assets/default-image.jpg';
              const imageData = await this.imageService.getImage(url).toPromise();
              const imageBlob = new Blob([imageData!], { type: 'image/jpeg' });
              
              return {
                id: toolId,
                name: toolName,
                description: toolDescription,
                src: URL.createObjectURL(imageBlob),
                status: "Maintainance",
                kiosk: kiosk,
                category: category,
                price: price,
                condition: condition
              };
            } else {
              const defaultImageBlob = await this.getDefaultImageBlob();
              return {
                id: toolId,
                name: toolName,
                description: toolDescription,
                src: URL.createObjectURL(defaultImageBlob),
                status: "Maintainance",
                kiosk: kiosk,
                category: category,
                price: price,
                condition: condition
              };
            }
          });
  
        const maintainanceTools = await Promise.all(observables);
        this.maintainanceTools = maintainanceTools;

        
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

  maintain(id: number | null): void {
    this.toolService.editToolById(id ?? 1, {status: "Under Maintainance"}).subscribe(async (response: any) => {
            window.location.reload();
  })
  }

  onButtonClick(toolId: number | null): void {
          }
  
  onMenuClickStatus(action: string, toolId: number | null): void {
          this.toolService.editToolByIdStatus(toolId ?? 1, {status: action}).subscribe(async (response: any) => {
                window.location.reload();
      })
    
  }

  onMenuClick(action: string, toolId: number | null): void {
              this.toolService.editToolByIdStatus(toolId ?? 1, {status: action}).subscribe(async (response: any) => {
                window.location.reload();
      })
    
  }

  async onMenuClickDelete(toolId: number | null): Promise<void> {
    (await this.dateRangeService.deleteDateRangesById(toolId ?? 1)).subscribe(async (response: any) => {
          });

    (await this.imageService.deleteFilesByToolId(toolId ?? 1)).subscribe(async (response: any) => {
                  this.toolService.deleteToolById(toolId ?? 1).subscribe(async (response: any) => {
                    window.location.reload();
        })
       });
  }

  async onMenuClickUpdate(toolId: number | null): Promise<void> {
    try {
                  
            const tool: GetToolDto = await (await this.toolService.getToolById(toolId ?? 1)).toPromise() ?? {};
        
            const toolPictures: GetToolPictureDto[] = await (await this.imageService.getPicturesByToolId(toolId!)).toPromise() ?? [{}];
      
      const toolDateRanges: GetDateRangeDto[] = await (await this.dateRangeService.getDateRangesByToolId(toolId!)).toPromise() ?? [{}];
                  this.openDialog(tool, toolPictures, toolDateRanges);
    } catch (error) {
      console.error(error);
    }
  }
  
  

  
  
  
  
  
  }
