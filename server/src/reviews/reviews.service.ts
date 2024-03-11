import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientsService } from '../clients/clients.service';
import { PompistesService } from '../pompistes/pompistes.service';
import { Review } from './schemas/review.schema';
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
    const { phone, matriculeRH, etoiles, commentaire } = createReviewDto;
    const client = await this.clientService.getClientByPhone(phone);
    const pompiste = await this.pompisteService.getPompisteByMatriculeRH(matriculeRH);

    const review = new this.reviewModel({ client, pompiste, etoiles, commentaire, dateReview: new Date() });
    await review.save();

    const clientScore = 300;
    const clientUpdatePromise = this.clientService.updateClientScore(client, clientScore);

    let pompisteScore = [0, 100, 200, 300][etoiles - 2] || 0;
    await this.pompisteService.updatePompisteScore(pompiste, pompisteScore);

    const reviews = await this.reviewModel.find({ pompiste }).exec();
    const meanEtoiles = Math.floor(reviews.reduce((acc, cur) => acc + cur.etoiles, 0) / reviews.length);
    await this.pompisteService.updatePompisteEtoiles(pompiste, meanEtoiles);

    await Promise.all([clientUpdatePromise]);
}



  async getAll(matriculeRH: string) {
    const id = await this.pompisteService.getPompisteByMatriculeRH(matriculeRH);
    const reviews = await this.reviewModel.find({ pompiste: id }).populate(['pompiste', 'client']).exec();
    return reviews;
  }
}
