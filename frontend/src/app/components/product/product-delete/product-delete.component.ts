import { Component } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-product-delete",
    templateUrl: "./product-delete.component.html",
    styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent {
    product: Product = {} as Product;

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get("id")!;
        if (id !== null) {
            this.productService.readById(id).subscribe((product) => {
                this.product = product;
            });
        }
    }

    deleteProduct(): void {
        const id = +this.route.snapshot.paramMap.get("id")!;
        this.productService.delete(id).subscribe(() => {
            this.productService.showMessage("Produto Removido com Sucesso");
            this.router.navigate(["/products"]);
        });
    }

    cancel(): void {
        this.router.navigate(["/products"]);
    }
}
