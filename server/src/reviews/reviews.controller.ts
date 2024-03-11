import { Controller, Post, Body, HttpStatus, HttpException, Get, Param, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    try {
        await this.reviewService.createReview(createReviewDto);
        return { message: 'Évaluation créée avec succès' }; 
    } catch (error) {
        throw new HttpException({ message: `Échec de la création de l\'évaluation : ${error.message}` }, HttpStatus.BAD_REQUEST);
    }
}

  @Get("/all/:matriculeRH")
  async getAllReviews(@Param("matriculeRH") matriculeRH: string){
    const reviews = await this.reviewService.getAll(matriculeRH);
    if(reviews.length === 0){
      throw new NotFoundException("Aucune évaluation trouvée");
    }else{
      return reviews;
    }
  }
 
}
