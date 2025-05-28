import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('loaded');
  }
}
