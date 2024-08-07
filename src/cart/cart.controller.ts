import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from 'src/dto/add-to-cart.dto';
import { UpdateCartDto } from 'src/dto/add-to-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Req() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(
      req.user.id,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Patch()
  update(@Req() req, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.addToCart(
      req.user.id,
      updateCartDto.productId,
      updateCartDto.quantity,
    );
  }

  @Delete()
  removeFromCart(@Req() req, @Param('cartItemId') cartItemId: number) {
    return this.cartService.removeFromCart(cartItemId);
  }
}
