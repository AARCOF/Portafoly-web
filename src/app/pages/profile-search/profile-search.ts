import { Component } from '@angular/core';
import { UserService } from '../../services/userService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-search.html',
  styleUrl: './profile-search.css',
})
export class ProfileSearch {
  query: string = '';
  results: any[] = [];

  constructor(private userService: UserService) {}

  search() {
    if (this.query.trim().length > 0) {
      this.userService.searchUsers(this.query).subscribe((users) => {
        this.results = users;
      });
    } else {
      this.results = [];
    }
  }
}
