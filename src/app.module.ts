import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductService } from './product/product.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, DatabaseModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
