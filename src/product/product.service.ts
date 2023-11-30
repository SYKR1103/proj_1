import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { HttpException, HttpStatus} from '@nestjs/common';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepo : Repository<Product>
  ) {}

  async createP(c:CreateProductDto) {
    const newproduct = await this.productRepo.create(c)
    await this.productRepo.save(newproduct)
    return newproduct
  }

  async getP() {
    return await this.productRepo.find()
  }

  async updateP(id : string, c:CreateProductDto) {
    await this.productRepo.update(id, c)
    const updatedproduct = await this.productRepo.findOneBy({id})
    if (updatedproduct) return updatedproduct
    throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
  }

  async deleteP(id : string) {
    const deleteresponse = await this.productRepo.delete(id)
    if(!deleteresponse.affected) throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
    return "deleted"
  }

}
