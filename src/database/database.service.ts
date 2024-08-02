import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findUnique(arg0: { where: { id: number } }) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(arg0: {
    data: {
      totalPrice: number;
      productId: number;
      quantity: number;
      userId: number;
    };
  }):
    | {
        id: number;
        productId: number;
        quantity: number;
        totalPrice: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
      }
    | PromiseLike<{
        id: number;
        productId: number;
        quantity: number;
        totalPrice: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
      }> {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect();
  }
}
