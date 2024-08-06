import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async findById(id: number): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error('Email is required');
    }
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }
  async createUser(userData: {
    email: string;
    password: string;
    role: Role;
  }): Promise<User> {
    return this.databaseService.user.create({
      data: userData,
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.databaseService.user.update({
      where: { id },
      data: userData,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
