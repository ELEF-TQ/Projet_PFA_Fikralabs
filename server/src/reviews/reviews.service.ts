import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientsService } from '../clients/clients.service';
import { PompistesService } from '../pompistes/pompistes.service';
import { Review } from '../reviews/schemas/review.entity';
import { UpdatePompisteDto } from '../pompistes/dto/update-pompiste.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly pompisteService: PompistesService,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(phone: string, matriculeRH: string, etoiles: number): Promise<void> {
    const clientId = await this.clientService.getClientIdByPhone(phone);
    const pompisteId = await this.pompisteService.getPompisteIdByMatriculeRH(matriculeRH);

    // Create the review
    const review = new this.reviewModel({
      client_id: clientId,
      pompiste_id: pompisteId,
      etoiles,
    });
    await review.save();

    // Update the scores
    const clientScore = 300;
    const clientUpdatePromise = this.clientService.updateClientScore(clientId, clientScore);

    // Update the pompiste's etoiles based on the mean etoiles
    const reviews = await this.reviewModel.find({ pompiste_id: pompisteId }).exec();
    let totalEtoiles = 0;
    for (const review of reviews) {
        totalEtoiles += review.etoiles;
    }
    const meanEtoiles = totalEtoiles / reviews.length;

    // Update the pompiste's etoiles using the PompisteService
    const updatePompisteDto: UpdatePompisteDto = { etoiles: meanEtoiles };
    await this.pompisteService.update(pompisteId, updatePompisteDto);

    await Promise.all([clientUpdatePromise]);
  }
}
