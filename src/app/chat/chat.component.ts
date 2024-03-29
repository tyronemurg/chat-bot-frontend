import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounce } from 'lodash';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recentChats: any[] = [];
  selectedChat: any = null;
  isDarkModeActive: boolean = true;

  toggleDarkMode() {
    this.isDarkModeActive = !this.isDarkModeActive;
  }

  messages: { content: string, sender: string }[] = [];
  newMessage: string = '';
  constructor(private http: HttpClient,private chatService: ChatService) {}

  ngOnInit(): void {

    this.loadRecentChats();
  }

  loadRecentChats(): void {
    this.chatService.getRecentChats().subscribe((chats) => {
      this.recentChats = chats;
      console.log(this.recentChats)
    });
  }

  loadConversation(chat: any): void {
    if (!chat || !chat._id) {
      console.error('Invalid chat data:', chat);
      return;
    }
  
    this.selectedChat = chat;
    this.chatService.getConversation(chat._id).subscribe(
      (conversation) => {
        if (conversation && conversation.messages) {
          this.messages = conversation.messages;
        } else {
          console.error('Invalid conversation data:', conversation);
        }
      },
      (error) => {
        console.error('Error loading conversation:', error);
      }
    );
  }
  
  


  isBotTyping: boolean = false; 

  formatCode(message: string): string {
    const codeRegex = /```([\s\S]+?)```/g;
    return message.replace(codeRegex, '```$1```');
  }

  sendMessage() {
    const userMessage = this.newMessage.trim();
    if (!userMessage) return;

    this.messages.push({ content: userMessage, sender: 'You' });
    this.isBotTyping = true;
    this.http.post<any>('http://localhost:3000/api/chatgpt', { message: userMessage })
      .subscribe(response => {
        this.isBotTyping = false;
        this.messages.push({ content: response.message, sender: 'Bot' });
      });

    this.newMessage = '';
  }

  private debouncedSendMessage = debounce(this.sendMessage.bind(this), 1000);

  onInputChange() {
    this.debouncedSendMessage();
  }

  onEnterKey(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
      event.preventDefault(); // Prevent the default behavior (form submission)
    }
  }

}
