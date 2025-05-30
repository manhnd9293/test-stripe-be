import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dtos/product-create.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get('/')
  getAll() {
    return this.productsService.getAll();
  }

  @Post("/")
  createProduct(@Body() data: ProductCreateDto) {
    return this.productsService.create(data);
  }
}
