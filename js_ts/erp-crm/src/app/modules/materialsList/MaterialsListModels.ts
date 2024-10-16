import { AvailableColors } from "../../../_metronic/helpers/custom/colorIcon.util";

export interface IMaterialList {
  id: number;
  name: string;
  groups: IMaterialGroup[];
  materialListDescription: string;
}

export interface IMaterialGroup {
  availableColors: AvailableColors[];
  groupCode: string;
  groupName: string;
  items: IMaterialListProperties[];
  groupDescription: string;
}

export interface IMaterialListProperties {
  vendorCode: string;
  color: AvailableColors;
  purchasePrice: number;
  quantity: number;
  balance: "write-off" | "in-stock";
  consumerPrice: number;
  maximumPrice: number;
  wholesalePrice: number;
  itemDescription?: string;
  shipments?: IShipments[];
}

export interface IShipments {
  status: "in-stock" | "sold-out";
  date: Date;
  // temp type
  invoice: string;
  provider: string | null;
  client: string | null;
  shipmentHistory: IShipmentHistory[];
  guarantee: Date | null;
  // quantity: number;
}

export interface IShipmentHistory {
  shipmentType: "from-provider" | "to-client";
  price: number;
  date: Date;
  stockName: string;
  invoice: string;
  serialNumber: string;
  client: string | null;
}
