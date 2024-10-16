import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './interfaces/favourite.interface';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';

@Injectable()
export class FavoritesService {
  private favorites: Favorite[] = [
    { id: 1, userId: 1, restaurantId: 1 },
    { id: 2, userId: 1, restaurantId: 2 },
  ];

  create(createFavoriteDto: CreateFavoriteDto) {
    const newFavorite: Favorite = {
      id: this.favorites.length + 1,
      ...createFavoriteDto,
    };
    this.favorites.push(newFavorite);
    return newFavorite;
  }

  findAllForUser(userId: number) {
    return this.favorites.filter((favorite) => favorite.userId === userId);
  }

  remove(removeFavoriteDto: RemoveFavoriteDto) {
    const { userId, restaurantId } = removeFavoriteDto;

    const favoriteIndex = this.favorites.findIndex(
      (favorite) =>
        favorite.userId === userId && favorite.restaurantId === restaurantId,
    );

    if (favoriteIndex === -1) {
      throw new NotFoundException(
        `Favorite for user with ID ${userId} and restaurant with ID ${restaurantId} not found`,
      );
    }

    this.favorites.splice(favoriteIndex, 1);
    return { message: `favorite removed` };
  }
}
