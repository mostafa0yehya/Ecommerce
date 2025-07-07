import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  fakeStrings: string[] = [
    'First item',
    'Second item',
    'Third item',
    'Fourth item',
    'Fifth item',
  ];

  // test(): Observable<string> {
  //   return new Observable((subscriber) => {
  //     if (!isPlatformBrowser(this.platformId)) {
  //       subscriber.complete();
  //       return;
  //     }

  //     let currentIndex = 0;
  //     const intervalId = setInterval(() => {
  //       if (currentIndex < this.fakeStrings.length) {
  //         subscriber.next(this.fakeStrings[currentIndex]);
  //         currentIndex++;
  //       } else {
  //         clearInterval(intervalId);
  //         subscriber.complete();
  //       }
  //     }, 3000);
  //   });
  // }
}
