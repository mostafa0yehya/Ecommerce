import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { WishlistButtonComponent } from "../../ui/wishlist-button/wishlist-button.component";
import { FeaturesOfProductComponent } from "../features-of-product/features-of-product.component";

@Component({
  selector: 'app-product',
  imports: [RouterLink, RouterLinkActive, WishlistButtonComponent, FeaturesOfProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent  {
  productDesc: string[] = [];
  randomNumber = Math.floor(Math.random() * 20) + 1;
  productId: string | null = null;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,public productService:ProductService
  
  ) {}
  @Input({ required: true }) product!: Product;


  ngOnDestroy(): void {}
 
}
