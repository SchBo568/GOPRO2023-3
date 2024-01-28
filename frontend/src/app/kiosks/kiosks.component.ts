import { Component } from '@angular/core';
import { KioskService } from '../../ApiServices/KioskService';
import { ToolService } from '../../ApiServices/ToolService';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { GetToolDto } from '../models/GetTool';
import { GetKiosks } from '../models/GetKiosks';
import { forkJoin } from 'rxjs';
import {MatTableModule} from '@angular/material/table';

export interface GetKiosksWithAmount { 
  PK_location_id?: number;
  name?: string;
  address?: string;
  placeholder?: number;
  used?: number;
}

@Component({
  selector: 'app-kiosks',
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
    ReactiveFormsModule, MatTableModule
  ],
  providers: [KioskService, ToolService],
  templateUrl: './kiosks.component.html',
  styleUrl: './kiosks.component.scss'
})
export class KiosksComponent {

  tools?: GetToolDto[];
  kiosks: GetKiosksWithAmount[] = [];

  constructor (
    private kioskService: KioskService,
    private toolService: ToolService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.getEverything();
  }

  getEverything(): void {
    this.kioskService.getKiosks().subscribe((response: GetKiosks[]) => {
        
      const observables = response.map(async (kioskData: GetKiosks) => {
        const id = kioskData.PK_location_id!;
        const name = kioskData.name;
        const address = kioskData.address;
        const placeholder = kioskData.placeholder;
  
        const toolsResponse = await (await this.toolService.getToolsByKiosk(id)).toPromise();
          
        const used = toolsResponse?.length;
  
        const kiosk: GetKiosksWithAmount = {
          PK_location_id: id,
          name: name,
          address: address,
          placeholder: placeholder,
          used: used,
        };
  
        return kiosk;
      });
  
      forkJoin(observables).subscribe((kiosks: GetKiosksWithAmount[]) => {
        this.kiosks = kiosks;
      });
    });
  }

}
