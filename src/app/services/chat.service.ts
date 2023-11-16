import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat-history';

  constructor(private http: HttpClient) { }

  getRecentChats(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
