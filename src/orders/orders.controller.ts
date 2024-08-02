import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.USER)
  @Post()
  createOrder(
    @Body() orderData: { productId: number; quantity: number; userId: number },
  ): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @Roles(Role.USER)
  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.deleteOrder(+id);
  }
}
