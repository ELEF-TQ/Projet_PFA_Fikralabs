import { Controller, Post, Body, HttpStatus, HttpException, Get, Param, NotFoundException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

  @Get("/all-pompiste/:matriculeRH")
  async getAllReviewsByPompiste(@Param("matriculeRH") matriculeRH: string){
    const reviews = await this.reviewService.getAllByPompiste(matriculeRH);
    return reviews;
  }

  
  @Get("/all-client/:clientId")
  async getAllReviewsByClient(@Param("clientId") clientId: string){
    const reviews = await this.reviewService.getAllByClient(clientId);
    return reviews;
  }


  @Post('alert/:id')
  async updateReviewAlertStatus(@Param('id') id: string) {
   return this.reviewService.updateAlertStatus(id);
  }

  @Patch(":id") 
  async update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
        const updatedReview = await this.reviewService.update(id, updateReviewDto);
        return { message: 'Évaluation mise à jour avec succès', updatedReview }; 
    } catch (error) {
        throw new HttpException({ message: `Échec de la mise à jour de l\'évaluation : ${error.message}` }, HttpStatus.BAD_REQUEST);
    }
  }
 
}
