import { Station } from "./station";
import { Train } from "./train";

export interface Route {
  id: number;

  name: string;

  originStation: Station;

  destinationStation: Station;

  trains: Train[];

  distance: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
