const fs = require("fs");

const data = fs.readFileSync("/Users/danlutsevich/Desktop/countries.json");

const parsed = JSON.parse(data);

const total = parsed.map((item) => ({
  country: item.name,

  phoneCode: item.phone_code,

  numericCode: item.numeric_code,

  capital: item.capital,

  currency: item.currency,

  currencyName: item.currency_name,

  currencySymbol: item.currency_symbol,

  iso3: item.iso3,

  iso2: item.iso2,

  lat: item.latitude,

  lng: item.longitude,

  emoji: item.emoji,
}));

console.log(total.find((item) => !item.lat));

// fs.writeFileSync(
//   "/Users/danlutsevich/Desktop/countriesCleaned.json",
//   JSON.stringify(total, null, 2)
// );

// console.log(total);

console.log(total.length);
