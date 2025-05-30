import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { PaymentsModule } from '../payments/payments.module';
import { ProductPriceEntity } from '../payments/entities/product-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductPriceEntity]), PaymentsModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
