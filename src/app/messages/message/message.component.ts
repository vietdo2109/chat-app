import { Component, input, OnInit } from '@angular/core';
import { Message } from '../../types/Message';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  isSelfMessage = input<boolean>();
  message = input<Message>();
  showSenderName = input<boolean>();
  isPending = input<boolean>();
  constructor() {}

  ngOnInit() {}
}
