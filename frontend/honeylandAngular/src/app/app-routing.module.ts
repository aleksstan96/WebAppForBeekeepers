import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcelarComponent } from './pcelar/pcelar.component';
import { LoginComponent } from './login/login.component';
import { PcelinjaciComponent } from './pcelinjaci/pcelinjaci.component';
import { PlanerComponent } from './planer/planer.component';
import { KupacComponent } from './kupac/kupac.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { Pcelar1Component } from './pcelar1/pcelar1.component';
import { ProductsComponent } from './products/products.component';
import { Shop1Component } from './shop1/shop1.component';
import { ProizvodDetaljiComponent } from './proizvod-detalji/proizvod-detalji.component';
import { ToolsComponent } from './tools/tools.component';
import { CartComponent } from './cart/cart.component';
import { PcelarDetaljiComponent } from './pcelar-detalji/pcelar-detalji.component';
import { SalesComponent } from './sales/sales.component';
import { HistoryComponent } from './history/history.component';
import { AutorizacijaPcelarService } from './servisi/autorizacija-pcelar.service';
import { AutorizacijaAdminService } from './servisi/autorizacija-admin.service';
import { AutorizacijaKupacService } from './servisi/autorizacija-kupac.service';
import { AutentikacijaService } from './servisi/autentikacija.service';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "pcelar", component: Pcelar1Component,canActivate:[AutentikacijaService, AutorizacijaPcelarService],
    children: [
      {path:"", redirectTo: "1/pcelinjaci", pathMatch:"full" ,},
      {path:":id/planer", component: PlanerComponent,},
      {path:":id/pcelinjaci", component: PcelinjaciComponent},
      {path:":id/profil", component: ProfileComponent,},
      {path:":id/products", component: ProductsComponent,},
      {path: ":id/tools", component: ToolsComponent,},
      {path: ":id/sales", component: SalesComponent,}
    ]
  },
  {path: "kupac", component: KupacComponent, canActivate: [AutentikacijaService]},
  {path: "admin", component: AdminComponent,canActivate: [AutentikacijaService, AutorizacijaAdminService]},
  {path: "shop", component: Shop1Component,canActivate: [AutentikacijaService]},
  {path: "history", component: HistoryComponent,canActivate:[AutentikacijaService, AutorizacijaKupacService],},
  {path: ":id/product", component: ProizvodDetaljiComponent,canActivate:[AutentikacijaService],},
  {path: "cart", component: CartComponent,canActivate:[AutentikacijaService, AutorizacijaKupacService],},
  {path: "pcelardetails/:id", component: PcelarDetaljiComponent,canActivate:[AutentikacijaService],},
  {path:'**', component:ErrorComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
