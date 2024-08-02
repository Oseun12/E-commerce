import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Roles(Role.ADMIN)
  @Post() //POST /product
  createProduct(
    @Body() productData: { name: string; description: string; price: number },
  ): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() productData: { name: string; description: string; price: number },
  ): Promise<Product> {
    return this.productService.updateProduct(+id, productData);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(+id);
  }
}
