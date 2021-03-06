import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';
import { HomemodalComponent } from './homemodal/homemodal.component';
import { WithdrawmodalComponent } from './withdrawmodal/withdrawmodal.component';
import { WalletSwitchComponent } from './walletswitch/walletswitch.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ModalComponent,
    HomemodalComponent,
    WithdrawmodalComponent,
    WalletSwitchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
