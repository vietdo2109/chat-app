import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-message-button',
  standalone: false,
  templateUrl: './message-button.component.html',
  styleUrls: ['./message-button.component.scss'],
})
export class MessageButtonComponent implements OnInit {
  svgIcon = input('');
  @Output() clicked = new EventEmitter<void>();
  constructor() {}
  handleClick() {
    this.clicked.emit();
  }
  ngOnInit() {}
}
