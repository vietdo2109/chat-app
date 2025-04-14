import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import {
  PHONE_ICON,
  SEARCH_ICON,
  MORE_ICON,
  SMILE_ICON,
  ATTACH_ICON,
  SEND_ICON,
} from '../messages/home/data';
@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'phone',
      sanitizer.bypassSecurityTrustHtml(PHONE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'search',
      sanitizer.bypassSecurityTrustHtml(SEARCH_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'more',
      sanitizer.bypassSecurityTrustHtml(MORE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'smile',
      sanitizer.bypassSecurityTrustHtml(SMILE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'attach',
      sanitizer.bypassSecurityTrustHtml(ATTACH_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'send',
      sanitizer.bypassSecurityTrustHtml(SEND_ICON)
    );
  }
}
