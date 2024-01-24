import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderModule } from './header/header.module';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastsComponent } from './shared/components/toast messages/toast.component';
import { ProfileModule } from './profile/profile.module';
import { ApiInterceptor } from './services/api.interceptor';
import { ChatModule } from './chat/chat.module';
import { UserConversationModule } from './chat/pages/user-conversation/user-conversation.module';
import { ModalRemoveGroupComponent } from './chat/components/modal-remove-group/modal-remove-group.component';
import { GroupConversationModule } from './chat/pages/group-conversation/group-conversation.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ToastsComponent,
    ModalRemoveGroupComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HeaderModule,
    SharedModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ProfileModule,
    ChatModule,
    UserConversationModule,
    GroupConversationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
