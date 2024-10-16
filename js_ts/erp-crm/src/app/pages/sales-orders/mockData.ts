import { IOrders, ISales } from "./interfaces/SalesOrders.interface";

// Mock data for ISales
export const salesData: ISales[] = [
  { key: 1, date: '2024-07-01', employee: 'John Doe', storage: 'Warehouse 1', client: 'Client A', summ: 1500, status: 'Completed' },
  { key: 2, date: '2024-07-02', employee: 'Jane Smith', storage: 'Warehouse 2', client: 'Client B', summ: 2500, status: 'Pending' },
  { key: 3, date: '2024-07-03', employee: 'Sam Green', storage: 'Warehouse 1', client: 'Client C', summ: 3000, status: 'Shipped' },
  { key: 4, date: '2024-07-04', employee: 'Chris Blue', storage: 'Warehouse 3', client: 'Client D', summ: 4000, status: 'Completed' },
  { key: 5, date: '2024-07-05', employee: 'Pat Brown', storage: 'Warehouse 1', client: 'Client E', summ: 1200, status: 'Pending' },
  { key: 6, date: '2024-07-06', employee: 'Alex White', storage: 'Warehouse 2', client: 'Client F', summ: 1300, status: 'Completed' },
  { key: 7, date: '2024-07-07', employee: 'Taylor Black', storage: 'Warehouse 3', client: 'Client G', summ: 2200, status: 'Shipped' },
  { key: 8, date: '2024-07-08', employee: 'Jordan Grey', storage: 'Warehouse 1', client: 'Client H', summ: 3100, status: 'Completed' },
  { key: 9, date: '2024-07-09', employee: 'Morgan Purple', storage: 'Warehouse 2', client: 'Client I', summ: 1700, status: 'Pending' },
  { key: 10, date: '2024-07-10', employee: 'Casey Red', storage: 'Warehouse 3', client: 'Client J', summ: 2800, status: 'Shipped' },
  { key: 11, date: '2024-07-11', employee: 'Sky Blue', storage: 'Warehouse 1', client: 'Client K', summ: 1900, status: 'Completed' },
  { key: 12, date: '2024-07-12', employee: 'Jordan Green', storage: 'Warehouse 2', client: 'Client L', summ: 2500, status: 'Pending' },
  { key: 13, date: '2024-07-13', employee: 'Robin Yellow', storage: 'Warehouse 3', client: 'Client M', summ: 3600, status: 'Shipped' },
  { key: 14, date: '2024-07-14', employee: 'Jamie Brown', storage: 'Warehouse 1', client: 'Client N', summ: 2200, status: 'Completed' },
  { key: 15, date: '2024-07-15', employee: 'Taylor Black', storage: 'Warehouse 2', client: 'Client O', summ: 1800, status: 'Pending' },
];

// Mock data for IOrders
export const ordersData: IOrders[] = [
  { key: 1, date: '2024-07-01', employee: 'John Doe', storage: 'Warehouse 1', receipt: 'R12345', status: 'Completed' },
  { key: 2, date: '2024-07-02', employee: 'Jane Smith', storage: 'Warehouse 2', receipt: 'R12346', status: 'Pending' },
  { key: 3, date: '2024-07-03', employee: 'Sam Green', storage: 'Warehouse 1', receipt: 'R12347', status: 'Shipped' },
  { key: 4, date: '2024-07-04', employee: 'Chris Blue', storage: 'Warehouse 3', receipt: 'R12348', status: 'Completed' },
  { key: 5, date: '2024-07-05', employee: 'Pat Brown', storage: 'Warehouse 1', receipt: 'R12349', status: 'Pending' },
  { key: 6, date: '2024-07-06', employee: 'Alex White', storage: 'Warehouse 2', receipt: 'R12350', status: 'Completed' },
  { key: 7, date: '2024-07-07', employee: 'Taylor Black', storage: 'Warehouse 3', receipt: 'R12351', status: 'Shipped' },
  { key: 8, date: '2024-07-08', employee: 'Jordan Grey', storage: 'Warehouse 1', receipt: 'R12352', status: 'Completed' },
  { key: 9, date: '2024-07-09', employee: 'Morgan Purple', storage: 'Warehouse 2', receipt: 'R12353', status: 'Pending' },
  { key: 10, date: '2024-07-10', employee: 'Casey Red', storage: 'Warehouse 3', receipt: 'R12354', status: 'Shipped' },
  { key: 11, date: '2024-07-11', employee: 'Sky Blue', storage: 'Warehouse 1', receipt: 'R12355', status: 'Completed' },
  { key: 12, date: '2024-07-12', employee: 'Jordan Green', storage: 'Warehouse 2', receipt: 'R12356', status: 'Pending' },
  { key: 13, date: '2024-07-13', employee: 'Robin Yellow', storage: 'Warehouse 3', receipt: 'R12357', status: 'Shipped' },
  { key: 14, date: '2024-07-14', employee: 'Jamie Brown', storage: 'Warehouse 1', receipt: 'R12358', status: 'Completed' },
  { key: 15, date: '2024-07-15', employee: 'Taylor Black', storage: 'Warehouse 2', receipt: 'R12359', status: 'Pending' },
];
