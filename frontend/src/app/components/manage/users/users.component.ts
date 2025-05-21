import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/interface';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  // Initialize userDataSource to prevent TypeScript error
  userDataSource: MatTableDataSource<User> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'role',
    'action',
  ];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        console.log('Users loaded:', users);
        // Initialize MatTableDataSource with users data
        this.userDataSource.data = users;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

  // Function to handle user deletion
  deleteUser(userId: string): void {
    console.log('Deleting user with id:', userId);
    // Logic to delete the user
  }
}
