import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { isPlatformBrowser } from '@angular/common';
import { interval, Observable, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  productDesc: string[] = [];
  randomNumber = Math.floor(Math.random() * 50) + 1;
  currentOffer: string = '';
  private subscription: Subscription | null = null;

  @Input({ required: true }) product!: Product;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.productDesc = [
      `Remaining: ${this.product.quantity}`,
      'Free Delivery',
      `${this.randomNumber} in ${this.product.category.name}`,
    ];
    this.subscription = this.test().subscribe({
      next: (res) => {
        this.currentOffer = res;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  test(): Observable<string> {
    if (!isPlatformBrowser(this.platformId) || this.productDesc.length === 0) {
      return new Observable<string>((subscriber) => {
        subscriber.complete();
      });
    }

    return interval(3000).pipe(
      map((index) => this.productDesc[index % this.productDesc.length]),
      takeWhile(() => this.productDesc.length > 0, true)
    );
  }

  productDiscount(product: Product) {
    if (product.priceAfterDiscount) {
      const discount =
        ((product.price - product.priceAfterDiscount) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  }
}