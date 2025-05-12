import { Component, input, OnInit } from '@angular/core';
import { Message } from '../../types/data';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  isSelfMessage = input<boolean>();
  message = input<Message>();
  constructor() {}

  ngOnInit() {}
}
