import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  PrismaClient,
  User,
  Cart,
  CartItem,
  Product,
  Order,
} from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findUniqueUser(params: {
    where: { id?: number; email?: string };
  }): Promise<User | null> {
    const { id, email } = params.where;
    if (id !== undefined) {
      return this.user.findUnique({ where: { id } });
    } else if (email !== undefined) {
      return this.user.findUnique({ where: { email } });
    }
    return null;
  }

  async findUniqueProduct(params: {
    where: { id: number };
  }): Promise<Product | null> {
    return this.product.findUnique({ where: params.where });
  }

  async createOrder(data: {
    productId: number;
    quantity: number;
    userId: number;
    totalPrice: number;
  }): Promise<Order> {
    return this.order.create({
      data,
    });
  }

  async deleteOrder(params: { where: { id: number } }): Promise<Order> {
    return this.order.delete({
      where: params.where,
    });
  }

  async findUniqueCart(params: {
    where: { id?: number; userId?: number };
  }): Promise<Cart | null> {
    return this.cart.findFirst({ where: params.where });
  }

  async createCart(data: { userId: number }): Promise<Cart> {
    return this.cart.create({
      data,
    });
  }

  async findUniqueCartItem(params: {
    where: { cartId: number; productId: number };
  }): Promise<CartItem | null> {
    return this.cartItem.findFirst({
      where: {
        cartId: params.where.cartId,
        productId: params.where.productId,
      },
    });
  }

  async createCartItem(data: {
    cartId: number;
    productId: number;
    quantity: number;
  }): Promise<CartItem> {
    return this.cartItem.create({
      data,
    });
  }

  async updateCartItem(params: {
    where: { id: number };
    data: { quantity: number };
  }): Promise<CartItem> {
    return this.cartItem.update({ where: params.where, data: params.data });
  }

  async deleteCartItem(params: { where: { id: number } }): Promise<CartItem> {
    return this.cartItem.delete({ where: params.where });
  }
}
