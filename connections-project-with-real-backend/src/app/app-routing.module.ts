import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegistrationPageComponent } from './auth/pages/registration-page/registration-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { authGuard } from './auth/guards/auth/auth.guard';
import { UserConversationComponent } from './chat/pages/user-conversation/user-conversation.component';
import { GroupConversationComponent } from './chat/pages/group-conversation/group-conversation.component';
import { blockLogGuard } from './auth/guards/auth/block-log.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginPageComponent,
    canActivate: [blockLogGuard],
  },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  {
    path: 'signup',
    component: RegistrationPageComponent,
    canActivate: [blockLogGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'conversation/:conversationID',
    component: UserConversationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'group/:groupID',
    component: GroupConversationComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
