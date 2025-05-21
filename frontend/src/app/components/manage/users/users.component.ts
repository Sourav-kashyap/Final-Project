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
    console.log('id->', userId);

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.removeUserFromTable(userId);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('Failed to delete the user');
      },
    });
  }

  removeUserFromTable(userId: string): void {
    const updatedData = this.userDataSource.data.filter(
      (user) => user.id !== userId
    );
    this.userDataSource.data = updatedData;
  }
}
