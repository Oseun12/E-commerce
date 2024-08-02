import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private database: DatabaseService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.database.product.findMany();
  }

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
  }): Promise<Product> {
    return this.database.product.create({
      data,
    });
  }

  async updateProduct(
    id: number,
    data: { name: string; description: string; price: number },
  ): Promise<Product> {
    return this.database.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.database.product.delete({
      where: { id },
    });
  }
}
