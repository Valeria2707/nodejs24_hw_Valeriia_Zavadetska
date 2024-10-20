import { Injectable } from '@nestjs/common';
import { Restaurant } from './interfaces/restaurant.interface';
import { SearchRestaurantDto } from './dto/search-restaurant.dto';

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'New York Pizza',
      description: 'Best pizza in town',
      location: 'Kyiv 123 Pizza St',
      rating: 4.5,
      cuisine: 'Italian',
      phoneNumber: '0293820902',
      averagePrice: 455,
      images: [],
    },
    {
      id: 2,
      name: 'Sushi Osama',
      description: 'Best sushi in town',
      location: 'Kyiv 123 Sushi St',
      rating: 4.3,
      cuisine: 'Japanese',
      phoneNumber: '0238947827',
      averagePrice: 789,
      images: [],
    },
  ];

  findAll(): Restaurant[] {
    return this.restaurants;
  }

  findOne(id: number): Restaurant | undefined {
    return this.restaurants.find((restourant) => restourant.id === id);
  }

  search(searchParams: SearchRestaurantDto): Restaurant[] {
    const { location, cuisine, rating } = searchParams;
    const filterRestourants = this.restaurants.filter(
      (restaurant) =>
        (!location ||
          restaurant.location
            .toLowerCase()
            .includes(location.trim().toLowerCase())) &&
        (!cuisine || restaurant.cuisine === cuisine) &&
        (!rating || restaurant.rating === rating),
    );
    return filterRestourants;
  }
}
