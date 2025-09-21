export interface Station {
  id: number;

  name: string;

  lat: number;

  lng: number;

  code: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
