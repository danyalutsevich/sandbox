export interface IFormMainInfo {
  name: string;
  nameEnglish: string;
  code: string;
  color: string;
  description: string;
}

export interface IFormMainPriceInfo {
  consumerPrice: number;
  maximumPrice: number;
  wholesalePrice: number;
  purchasePrice: number;
}

export interface IFormMainRulesInfo {
  // [x: string]: string;
  stockLondon1: string;
  stockLondon2: string;
}
