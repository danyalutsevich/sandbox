import { Route } from "./route";
import { Train } from "./train";

export interface Schedule {
  id: number;

  route: Route;

  train: Train;

  departureTime: Date;

  arrivalTime: Date;

  platform: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
