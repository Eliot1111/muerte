import menuPhotos from './menu-photos.json';
import { assetUrl } from '../utils/assetUrl';

export const photos: string[] = menuPhotos.photos ?? [];

export function getPhoto(index: number): string {
  if (photos.length === 0) return '';
  return assetUrl(photos[index % photos.length]);
}
