import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(searchTerm?: string, maxPrice?: number): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');

    if (searchTerm) {
      query.andWhere('product.name LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    if (maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    return query.getMany();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }
}
