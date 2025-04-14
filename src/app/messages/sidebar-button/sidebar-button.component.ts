import { Component, input } from '@angular/core';

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
  link = input();
  currentRoute: string = '';
  constructor() {}

  ngOnInit(): void {}
}
