import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './interfaces/review.interface';
import { getCurrentDate } from 'src/utils/date.util';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [
    {
      id: 1,
      restaurantId: 1,
      userId: 1,
      rating: 5,
      comment: 'Great place!',
      date: '2024-10-15',
    },
    {
      id: 2,
      restaurantId: 2,
      userId: 2,
      rating: 4,
      comment: 'Good food, but a bit expensive.',
      date: '2024-10-14',
    },
    {
      id: 3,
      restaurantId: 1,
      userId: 2,
      rating: 1,
      comment: 'It was awful',
      date: '2024-10-16',
    },
  ];

  create(createReviewDto: CreateReviewDto) {
    const newReview: Review = {
      id: this.reviews.length + 1,
      ...createReviewDto,
      date: getCurrentDate(),
    };
    this.reviews.push(newReview);
    return newReview;
  }

  findAllForRestaurant(restaurantId: number) {
    return this.reviews.filter(
      (review) => review.restaurantId === restaurantId,
    );
  }
}
