// src/products/dto/create-product.dto.ts
export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
}
