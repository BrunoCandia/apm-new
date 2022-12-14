import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    //selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {    
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    //listFilter: string = 'cart';
    errorMessage: string = '';
    subscription!: Subscription;

    private _listFilter: string = '';

    get listFilter(): string {
      return this._listFilter;
    }
    
    set listFilter(value: string) {
      this._listFilter = value;
      console.log('In setter:', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    // products: IProduct[] = [
    //     {
    //       "productId": 1,
    //       "productName": "Leaf Rake",
    //       "productCode": "GDN-0011",
    //       "releaseDate": "March 19, 2021",
    //       "description": "Leaf rake with 48-inch wooden handle.",
    //       "price": 19.95,
    //       "starRating": 3.2,
    //       "imageUrl": "assets/images/leaf_rake.png"
    //     },
    //     {
    //       "productId": 2,
    //       "productName": "Garden Cart",
    //       "productCode": "GDN-0023",
    //       "releaseDate": "March 18, 2021",
    //       "description": "15 gallon capacity rolling garden cart",
    //       "price": 32.99,
    //       "starRating": 4.2,
    //       "imageUrl": "assets/images/garden_cart.png"
    //     },
    //     {
    //       "productId": 5,
    //       "productName": "Hammer",
    //       "productCode": "TBX-0048",
    //       "releaseDate": "May 21, 2021",
    //       "description": "Curved claw steel hammer",
    //       "price": 8.9,
    //       "starRating": 4.8,
    //       "imageUrl": "assets/images/hammer.png"
    //     },
    //     {
    //       "productId": 8,
    //       "productName": "Saw",
    //       "productCode": "TBX-0022",
    //       "releaseDate": "May 15, 2021",
    //       "description": "15-inch steel blade hand saw",
    //       "price": 11.55,
    //       "starRating": 3.7,
    //       "imageUrl": "assets/images/saw.png"
    //     },
    //     {
    //       "productId": 10,
    //       "productName": "Video Game Controller",
    //       "productCode": "GMG-0042",
    //       "releaseDate": "October 15, 2020",
    //       "description": "Standard two-button video game controller",
    //       "price": 35.95,
    //       "starRating": 4.6,
    //       "imageUrl": "assets/images/xbox-controller.png"
    //     }
    //   ];

    // private _productService;
    // constructor(productService: ProductService){
    //   this._productService = productService;
    // }

    //Shorthand for above definition
    constructor(private productService: ProductService){
    }
  
    performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      //this.products = this.productService.getProducts();
      this.subscription = this.productService.getProducts().subscribe({
        next: products => { 
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });

      //this.filteredProducts = this.products;
      //this._listFilter = 'cart';
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    onRatingClicked(message: string): void {
      this.pageTitle = "Product List: " + message;
    }

    //Classic named function (method)
    // capitalizeName(product: IProduct): string {
    //   return product.productName.toUpperCase();
    // }

    //Arrow function
    //(product: IProduct) => product.productName.toUpperCase();

    //Multi-statement Arrow function
    // (product: IProduct) => {
    //   console.log(product.productName);
    //   return product.productName.toUpperCase();
    // }
}