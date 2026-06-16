import menuPhotos from './menu-photos.json';

export const photos: string[] = menuPhotos.photos ?? [];

export function getPhoto(index: number): string {
  if (photos.length === 0) return '';
  return photos[index % photos.length];
}
