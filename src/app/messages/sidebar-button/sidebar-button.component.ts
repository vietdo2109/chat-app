import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar-button',
  standalone: false,
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss',
})
export class SidebarButtonComponent {
  badgeNum = input();
  text = input();
  iconName = input();
  currentRoute: string = '';
  @Input() onClick!: () => void;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
