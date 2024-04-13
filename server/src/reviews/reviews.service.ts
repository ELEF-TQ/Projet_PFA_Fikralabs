import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientsService } from '../clients/clients.service';
import { PompistesService } from '../pompistes/pompistes.service';
import { Review } from './schemas/review.schema';
import { UpdatePompisteDto } from '../pompistes/dto/update-pompiste.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {

  constructor(
    private readonly clientService: ClientsService,
    private readonly pompisteService: PompistesService,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
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



async getAllByPompiste(matriculeRH: string) {
  const id = await this.pompisteService.getPompisteByMatriculeRH(matriculeRH);
  const reviews = await this.reviewModel.find({ pompiste: id })
    .populate({ path: 'pompiste', select: '-image -password ' })
    .populate({ path: 'client', select: '-image -password -coupons' }) 
    .exec();
  return reviews;
}

async getAllByClient(clientId: string) {
  const reviews = await this.reviewModel.find({ client: clientId })
    .populate({ path: 'pompiste', select: '-password' }) 
    .populate({ path: 'client', select: '-image -password -coupons' }) 
    .exec();
  return reviews;
}


async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
  const { commentaire } = updateReviewDto;
  const updatedReview = await this.reviewModel.findByIdAndUpdate(id, { commentaire }, { new: true });
  if (!updatedReview) {
    throw new NotFoundException('Évaluation introuvable');
  }
  return updatedReview;
}

async countReviews(): Promise<number> {
  try {
    // Utilisez la méthode countDocuments() pour compter le nombre de documents dans la collection
    const count = await this.reviewModel.countDocuments().exec();
    return count;
  } catch (error) {
    throw new Error(`Erreur lors du comptage des avis: ${error}`);
  }
}

}
