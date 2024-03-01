import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientsService } from '../clients/clients.service';
import { PompistesService } from '../pompistes/pompistes.service';
import { Review } from './schemas/review.schema';
import { UpdatePompisteDto } from '../pompistes/dto/update-pompiste.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {

  constructor(
    private readonly clientService: ClientsService,
    private readonly pompisteService: PompistesService,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<void> {
    const client = await this.clientService.getClientByPhone(createReviewDto.phone);
    const pompiste = await this.pompisteService.getPompisteByMatriculeRH(createReviewDto.matriculeRH);
    const etoiles = createReviewDto.etoiles;
    const commentaire = createReviewDto.commentaire;
    const review = new this.reviewModel({ client, pompiste, etoiles, commentaire });
    await review.save();

    const clientScore = 300;
    const clientUpdatePromise = this.clientService.updateClientScore(client, clientScore);

    // Update the pompiste's etoiles based on the mean etoiles
    const reviews = await this.reviewModel.find({ pompiste: pompiste }).exec();
    let totalEtoiles = 0;
    for (const review of reviews) {
        totalEtoiles += Number(review.etoiles);
    }

    const meanEtoiles = Math.floor(totalEtoiles / reviews.length) ;

   // Update the pompiste's etoiles using the PompisteService
// const updatePompisteDto: UpdatePompisteDto = { etoiles: meanEtoiles };
// console.log(updatePompisteDto)
await this.pompisteService.updateEtoiles(pompiste,meanEtoiles );

    // await Promise.all([clientUpdatePromise]);
}


  
  async getAll(matriculeRH: string){
    const id = await this.pompisteService.getPompisteByMatriculeRH(matriculeRH);
      const reviews = await this.reviewModel.find({ pompiste: id }).populate(['pompiste', 'client']).exec();
    return reviews;
  }
  

}
