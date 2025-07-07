import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/interfaces/product';
import { ProductComponent } from "../../shared/components/business/product/product.component";

@Component({
  selector: 'app-home',
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
productList:Product[]=[];
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (resbonse) => {
this.productList=resbonse.data      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
}
