export enum DogsType {
  DOG = 'dog',
  BIG_DOG = 'big-dog',
}

export interface DogGetRequest {
  page?: number;
  limit?: number;
  type?: DogsType;
}

export interface Dog {
  image: string;
  date: Date;
  type: DogsType;
  _id: string;
}

export interface DogGetResponse {
  totalCount: number;
  dogs: Dog[];
}
