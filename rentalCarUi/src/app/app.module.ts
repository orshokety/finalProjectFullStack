import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatNativeDateModule, MatIconModule, MatToolbarModule, MatListModule, 
  MatDialogModule, MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRadioModule, MatInputModule,
  MatFormFieldModule, MatDatepickerModule, MatCheckboxModule, MatAutocompleteModule, MatSnackBarModule, MatStepperModule, 
  MatBadgeModule, MatPaginatorModule, MatSortModule, MatTableModule, MatButtonToggleModule,
  } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ManagersComponent } from './Components/managers/managers.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { dialogcloseOrHome } from './HelpComponent/dialog-two-options/dialog-closeOrHome.component';
import { SearchCarComponent } from './Components/search-car/search-car.component';
import { CarsDitailsComponent } from './HelpComponent/cars-ditails/cars-ditails.component';
import { SearchCarPipe } from './Pipes/search-car.pipe';
import { DialogYesOrNoComponent } from './HelpComponent/dialog-yes-or-no/dialog-yes-or-no.component';
import { UserAddOrEditComponent } from './HelpComponent/UserAddOrEdit/UserAddOrEdit.component';
import { CarAddOrEditComponent } from './HelpComponent/car-edit/CarAddOrEdit.component';
import { CarTypeAddOrEditComponent } from './HelpComponent/car-type-edit/CarTypeAddOrEdit.component';
import { OrderAddOrEditComponent } from './HelpComponent/order-edit/OrderAddOrEdit.component';
import { ModelPipe } from './Pipes/model.pipe';
import { GearPipe } from './Pipes/gear.pipe';
import { MakerPipe } from './Pipes/maker.pipe';
import { YearPipe } from './Pipes/year.pipe';
import { RentAndPaymentComponent } from './Components/rent-and-payment/rent-and-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ManagersComponent,
    EmployeeComponent,
    dialogcloseOrHome,
    SearchCarComponent,
    CarsDitailsComponent,
    SearchCarPipe,
    DialogYesOrNoComponent,
    UserAddOrEditComponent,
    CarAddOrEditComponent,
    CarTypeAddOrEditComponent,
    OrderAddOrEditComponent,
    ModelPipe,
    GearPipe,
    MakerPipe,
    YearPipe,
    RentAndPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    
  ],
  entryComponents: [
  dialogcloseOrHome,
  LoginComponent,
  CarsDitailsComponent,
  DialogYesOrNoComponent,
  UserAddOrEditComponent,
  CarAddOrEditComponent,
  CarTypeAddOrEditComponent,
  OrderAddOrEditComponent,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
