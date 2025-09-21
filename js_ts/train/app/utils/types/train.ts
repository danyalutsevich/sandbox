import { Route } from "./route";
import { Station } from "./station";

export interface Train {
  id: number;

  name: string;

  type: string;

  capacity: number;

  manufacturer: string;

  yearBuilt: number;

  status: string;

  avgSpeed: number;

  nextStation: Station;

  route: Route;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
