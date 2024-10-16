import { Injectable } from '@nestjs/common';
import { MenuItem } from './interfaces/menu-item.interface';

@Injectable()
export class MenusService {
  private menuItems: MenuItem[] = [
    {
      id: 1,
      restaurantId: 1,
      name: 'Pizza Margherita',
      description: 'Classic pizza with tomatoes, mozzarella, and basil',
      price: 200,
    },
    {
      id: 2,
      restaurantId: 1,
      name: 'Spaghetti Carbonara',
      description:
        'Traditional Italian pasta with eggs, cheese, pancetta, and pepper',
      price: 300,
    },
    {
      id: 3,
      restaurantId: 2,
      name: 'This dish is a classic Japanese sushi roll with fresh fish, avocado, and cucumber, topped with teriyaki sauce and sesame seeds. It has a light and refreshing flavor, perfect for sushi lovers.',
      description: '',
      price: 350,
    },
  ];
  findAllForRestaurant(restaurantId: number) {
    return this.menuItems.filter((item) => item.restaurantId === restaurantId);
  }
}
