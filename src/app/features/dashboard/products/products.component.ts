import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-products',
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    providers: [ProductsService, HotToastService],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export default class ProductsComponent implements OnInit {

    public products: ProductEntity[] = [];
    public selectedProduct!: ProductEntity;

    productForm: FormGroup;

    productId!: string;

    isCreateMode: boolean = true;

    constructor(private readonly productService: ProductsService, private readonly toast: HotToastService) {
        this.productForm = new FormGroup({
            id: new FormControl(''),
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            height: new FormControl('', [Validators.required, Validators.min(0)]),
            length: new FormControl('', [Validators.required, Validators.min(0)]),
            width: new FormControl('', [Validators.required, Validators.min(0)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
        });
    }


    ngOnInit(): void {
        this.getAllProducts();
    }

    createProduct(product: any): void {
        this.productService.create(product).pipe(
            this.toast.observe({
                loading: 'Creando producto...',
                success: (response) => {
                    this.getAllProducts();
                    // this.closeModal();
                    return 'Producto creado correctamente';
                },
                error: (error: any) => {
                    return error.message || 'Error al crear producto';
                }
            }), catchError((error) => of(error))
        ).subscribe();
    }

    updateProduct(productId: string, product: any): void {
        this.productService.update(productId, product).pipe(
            this.toast.observe({
                loading: 'Actualizando producto...',
                success: (response) => {
                    this.getAllProducts();
                    this.closeModal();
                    return 'Producto actualizado correctamente';
                },
                error: (error: any) => {
                    return error.message || 'Error al actualizar producto';
                }
            }), catchError((error) => of(error))
        ).subscribe();
    }

    deleteProduct(): void {
        this.productService.delete(this.productId).pipe(
            this.toast.observe({
                loading: 'Eliminando producto...',
                success: (value) => {
                    this.getAllProducts();
                    return 'Producto eliminado correctamente';
                },
                error: (error: any) => {
                    return error.message || 'Error al eliminar producto';
                }
            }), catchError((error) => of(error))
        ).subscribe({});
    }

    getAllProducts(): void {
        this.productService.getAll().subscribe({
            next: (response) => {
                console.log(response);
                this.products = response;
                setTimeout(() => {
                    initFlowbite();
                }, 1000);
            },
            error: (error) => console.error(error)
        });
    }

    trackByProduct(index: number, product: any): any {
        return product.id;
    }

    openModal(product?: ProductEntity): void {
        console.log(product);
        this.isCreateMode = !product;
        this.selectedProduct = product || {} as ProductEntity;
        this.resetForm();

        if (product) {
            this.productForm.patchValue({
                id: product.id,
                name: product.name,
                height: product.height,
                length: product.length,
                width: product.width,
                description: product.description
            });
        }
    }

    closeModal(): void {
        this.resetForm();
    }

    resetForm(): void {
        this.productForm.reset();
    }

    onSubmit(): void {

        console.log(this.productForm.value);
        console.log(this.productForm.errors);

        if (this.productForm.valid) {
            console.log('Formulario válido');
            const productData = this.productForm.value;
            if (this.isCreateMode) {
                console.log('Creando producto');
                this.createProduct(productData);
            } else {
                console.log('Actualizando producto');
                this.updateProduct(this.selectedProduct.id, productData);
            }
        }
    }

    searchProduct(event: Event): void {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (value) {
            if (value.length > 5) {
                this.products = this.products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()) || product.description.toLowerCase().includes(value.toLowerCase()) || product.id.toLowerCase().includes(value.toLowerCase()));
            } else {
                this.getAllProducts();
            }
        }
    }
}


export class ProductEntity {
    // id          String   @id @default(uuid())
    // createdAt   DateTime @default(now())
    // updatedAt   DateTime @updatedAt
    // name        String
    // description String
    // height      Float?
    // length      Float?
    // width       Float?
    constructor(
        public id: string,
        public createdAt: Date,
        public updatedAt: Date,
        public name: string,
        public description: string,
        public height: number | null,
        public length: number | null,
        public width: number | null,
    ) { }
}
