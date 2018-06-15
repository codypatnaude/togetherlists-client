import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { ListComponent } from './list/list.component';
import { ListIoService } from './services/websocket/list-io.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService, tokenGetter } from './auth/auth.service';
import { ItemInputComponent } from './item-input/item-input.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {Ng2Webstorage} from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListSelectorComponent,
    ListComponent,
    ItemInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000', 'api.togetherlists.com'],
        blacklistedRoutes: ['localhost:3000/auth/', 'api.togetherlists.com/auth/']
      }
    }),
    SortablejsModule.forRoot({}),
    AngularFontAwesomeModule,
    Ng2Webstorage
  ],
  providers: [ApiService, ListIoService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
