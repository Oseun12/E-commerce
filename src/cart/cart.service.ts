import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Cart, CartItem } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private databaseService: DatabaseService) {}

  async getCart(userId: number): Promise<Cart | null> {
    return this.databaseService.findUniqueCart({ where: { userId } });
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    let cart = await this.getCart(userId);

    if (!cart) {
      cart = await this.databaseService.createCart({ userId });
    }

    const existingItem = await this.databaseService.findUniqueCartItem({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      return this.databaseService.updateCartItem({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      return this.databaseService.createCartItem({
        cartId: cart.id,
        productId,
        quantity,
      });
    }
  }

  async removeFromCart(cartItemId: number): Promise<CartItem> {
    return this.databaseService.deleteCartItem({
      where: { id: cartItemId },
    });
  }
}
