import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { AddToolComponent } from './add-tool/add-tool.component';
import { MyToolsComponent } from './my-tools/my-tools.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ToolDetailViewComponent } from './tool-detail-view/tool-detail-view.component';
import { RentedToolsComponent } from './rented-tools/rented-tools.component';
import { KioskService } from '../ApiServices/KioskService';
import { KiosksComponent } from './kiosks/kiosks.component';
import { PaymentsComponent } from './payments/payments.component';

export const routes: Routes = [
    //{path: '', component: HeaderComponent},
    {path: '', component: HomepageComponent},
    {path: 'user-details', component: UserDetailsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'add-tool', component: AddToolComponent},
    {path: 'my-tools', component: MyToolsComponent},
    {path: 'rented-tools', component: RentedToolsComponent},
    {path: 'kiosks', component: KiosksComponent},
    {path: 'payments', component: PaymentsComponent},
    {path: 'tool-detail-view/:toolId', component: ToolDetailViewComponent},
];