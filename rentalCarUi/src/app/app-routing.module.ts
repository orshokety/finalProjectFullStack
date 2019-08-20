import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SearchCarComponent } from './Components/search-car/search-car.component';
import { AdminGuard } from './Guards/admin.guard';
import { RegularGuard } from './Guards/regular.guard';
import { ManagersComponent } from './Components/managers/managers.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { EmployeeGuard } from './Guards/employee.guard';
import { RentAndPaymentComponent } from './Components/rent-and-payment/rent-and-payment.component';

const routes: Routes = [  
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: "home" , component: HomeComponent },
  { path: "login" , component: LoginComponent },
  { path: "register" , component: RegisterComponent },
  { path: "search", component: SearchCarComponent },
  { path: "rentAndPayment", component: RentAndPaymentComponent, canActivate: [RegularGuard]},
  { path: "managers", component: ManagersComponent, canActivate: [AdminGuard]},
  { path: "employee", component: EmployeeComponent, canActivate: [EmployeeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
