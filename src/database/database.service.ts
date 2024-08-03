import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(arg0: { where: { id: number } }):
    | {
        id: number;
        email: string;
        password: string;
        role: import('.prisma/client').$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
      }
    | PromiseLike<{
        id: number;
        email: string;
        password: string;
        role: import('.prisma/client').$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
      }> {
    throw new Error('Method not implemented.');
  }
  async findUnique(params: {
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
