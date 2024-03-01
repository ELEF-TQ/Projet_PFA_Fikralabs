import { Controller, Post, Body, HttpStatus, HttpException, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      await this.reviewService.createReview(createReviewDto.phone, createReviewDto.matriculeRH, createReviewDto.etoiles);
      return { message: 'Review created successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("/all/:matriculeRH")
  async getAllReviews(@Param("matriculeRH") matriculeRH: string){
    return await this.reviewService.getAll(matriculeRH);
  }
 
}
