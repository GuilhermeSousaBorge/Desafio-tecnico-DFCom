import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './schemas/review.schema';
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() review: Review) {
    return this.reviewsService.create(review);
  }

  @Get()
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':productId')
  async findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() review: Review) {
    return this.reviewsService.update(id, review);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
