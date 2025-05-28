import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
@Component({
  selector: 'app-sidebar-button',
  imports: [MatIcon, MatBadge],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss',
})
export class SidebarButtonComponent {
  badgeNum = input();
  text = input();
  iconName = input();
  currentRoute: string = '';
  @Input() onClick!: () => void;
  @Input() isCurrentRoute!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
