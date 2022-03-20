import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarteComponent } from './components/carte/carte.component';

//pour apicrud service :
import{HttpClientModule} from '@angular/common/http';
// googlemaps:
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: *******
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
