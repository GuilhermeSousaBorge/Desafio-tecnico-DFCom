import { Injectable, NotFoundException } from '@nestjs/common';
import { Review, ReviewDodument } from './schemas/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDodument>,
  ) {}

  async create(review: Review): Promise<Review> {
    return this.reviewModel.create(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId }).exec();
  }

  async update(id: string, review: Review): Promise<Review> {
    const updated = await this.reviewModel
      .findByIdAndUpdate(id, review, {
        new: true,
      })
      .exec();
    if (!updated) throw new NotFoundException('Review nao encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Review nao encontrado');
  }
}
