import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private router: Router) {}

  onLogout() {
    // delete the token
    // after all done, navigate to login page
    // this.router.navigate(['/auth/login']);
  }
}
