export interface PostWrite {
  title: string;
  content: string;
  published: boolean;
  planetId: number;
  address: string;
  location: [{ latitude: number; longitude: number }];
  imageUrls: [string];
  tags: string[];
  id: number;
}
