import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(id: string, product: Product): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, product, {
        new: true,
      })
      .exec();
    if (!updated) throw new NotFoundException('Produto não encontrado');
    return updated;
  }
  async remove(id: string): Promise<void> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Produto nao encontrado');
  }
}
