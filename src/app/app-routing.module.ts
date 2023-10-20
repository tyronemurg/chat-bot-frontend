import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' }, // Redirect empty path to /chat
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
