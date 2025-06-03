import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDodument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: string;
  @Prop({ required: true })
  author: string;
  @Prop({ required: true, min: 1, max: 5 })
  rating: string;
  @Prop()
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
