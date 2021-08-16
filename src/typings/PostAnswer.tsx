export interface Person {
  username: string;
  description: string;
  firstName: string;
  followers: number;
  following: number;
  jobTitle: string;
  lastName: string;
  profilePhotoUrl: string;
}

export interface Photo {
  id: number;
  url: string;
}

export interface PostAnswer {
  id: number;
  author: Person;
  commentsCount: number;
  createdAt: string;
  description: string;
  isLiked: boolean;
  likesCount: number;
  photos: Photo[];
}
