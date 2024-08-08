import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<Product[]> {
    return this.productService.findAll(searchTerm, maxPrice);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }
}
