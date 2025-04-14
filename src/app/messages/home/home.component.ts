import { ChatSlot, chatSlots } from './data';
import { Component } from '@angular/core';

import { MyServiceService } from '../../services/my-service.service';
import { IconsService } from '../../services/icons.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  art = {};
  constructor(
    private artService: MyServiceService,
    private iconService: IconsService
  ) {
    // const iconRegistry = inject(MatIconRegistry);
    // const sanitizer = inject(DomSanitizer);
    // iconRegistry.addSvgIconLiteral(
    //   'phone',
    //   sanitizer.bypassSecurityTrustHtml(PHONE_ICON)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   'search',
    //   sanitizer.bypassSecurityTrustHtml(SEARCH_ICON)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   'more',
    //   sanitizer.bypassSecurityTrustHtml(MORE_ICON)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   'smile',
    //   sanitizer.bypassSecurityTrustHtml(SMILE_ICON)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   'attach',
    //   sanitizer.bypassSecurityTrustHtml(ATTACH_ICON)
    // );
    // iconRegistry.addSvgIconLiteral(
    //   'send',
    //   sanitizer.bypassSecurityTrustHtml(SEND_ICON)
    // );
  }
  searchInput = '';
  chatSlots = chatSlots;
  chatList = chatSlots;
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 128; // 1.5em * 6 + padding = ~128px

    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';

    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  handleRemove(event: ChatSlot) {
    this.chatSlots = this.chatSlots.filter(
      (chatSlot) => chatSlot.id !== event.id
    );
  }
  ngOnInit() {
    this.artService.getArt().subscribe((data) => {
      console.log(data);
      this.art = data;
    });
  }
}
