import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private databaseService: DatabaseService) {}

  async createOrder(data: {
    productId: number;
    quantity: number;
    userId: number;
  }): Promise<Order> {
    const product = await this.databaseService.findUniqueProduct({
      where: { id: data.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const totalPrice = product.price * data.quantity;

    return this.databaseService.createOrder({
      ...data,
      totalPrice,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.databaseService.deleteOrder({
      where: { id },
    });
  }
}
