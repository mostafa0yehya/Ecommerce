import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute ,RouterLink} from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/interfaces/product';
import { FeaturesOfProductComponent } from "../../shared/components/business/features-of-product/features-of-product.component";
import { WishlistButtonComponent } from "../../shared/components/ui/wishlist-button/wishlist-button.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-product-details',
  imports: [FeaturesOfProductComponent,  WishlistButtonComponent,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class ProductDetailsComponent {
  productId: string | null = null;
  productData: Product | null = null;
  
  stars: ('full' | 'half' | 'empty')[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');

        if (this.productId)
          this.productService.getProductDetails(this.productId).subscribe({
            next: (res) => {
              this.productData = res.data;
              console.log(this.productData);
              this.calcRating();
            },
          });
      },
    });
  }
  calcRating() {
    this.stars=[]
    let rating = this.productData?.ratingsAverage;
    if (rating) {
      for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
          this.stars.push('full');
        } else if (rating >= i - 0.5) {
          this.stars.push('half');
        } else {
          this.stars.push('empty');
        }
      }
    }
    console.log(this.stars);
  }
}
