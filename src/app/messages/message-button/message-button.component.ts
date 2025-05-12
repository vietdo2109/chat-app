import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-button',
  standalone: false,
  templateUrl: './message-button.component.html',
  styleUrls: ['./message-button.component.scss'],
})
export class MessageButtonComponent implements OnInit {
  svgIcon = input('');
  constructor() {}

  ngOnInit() {}
}
