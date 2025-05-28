import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarButtonComponent } from '../sidebar-button/sidebar-button.component';
@Component({
  selector: 'app-sidebar',
  imports: [SidebarButtonComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentRoute: 'conversations' | 'groups' | 'ais' | 'profile' =
    'conversations';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      console.log(segments);
      if (segments.some((s) => s.path === 'groups')) {
        this.currentRoute = 'groups';
      } else if (segments.some((s) => s.path === 'profile')) {
        this.currentRoute = 'profile';
      } else if (segments.some((s) => s.path === 'ais')) {
        this.currentRoute = 'ais';
      } else {
        this.currentRoute = 'conversations';
      }
    });

    console.log(this.currentRoute);
  }
  onLogout() {
    // delete the token
    this.authService.onLogout();
    // after all done, navigate to login page
  }
}
