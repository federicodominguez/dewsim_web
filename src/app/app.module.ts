import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from './services/device.service';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { IgxCarouselModule } from 'igniteui-angular';
import { OverviewComponent } from './components/overview/overview.component';
import { DeviceDetailComponent } from './components/overview/device-detail/device-detail.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HomeComponent } from './components/home/home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { TaskDetailComponent } from './components/overview/task-detail/task-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'home', component: HomeComponent }, 
  { path: '', pathMatch: 'full', redirectTo: '/' }
];
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    OverviewComponent,
    DeviceDetailComponent,
    HomeComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    IgxCarouselModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatRippleModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
