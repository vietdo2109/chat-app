import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ChatSlot, chatSlots } from '../home/data';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input()
  chatSlot!: ChatSlot;

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  onRemove() {
    this.remove.emit(this.chatSlot);
  }
}
