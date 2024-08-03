import { UpdateProductDto } from './../dto/product.dto';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from 'src/dto/product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private databaseService: DatabaseService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.databaseService.product.findMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.databaseService.product.findUnique({
      where: { id },
    });
  }

  async delete(id: number): Promise<Product> {
    return this.databaseService.product.delete({
      where: { id },
    });
  }
}
