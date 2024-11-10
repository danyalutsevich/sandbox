const fs = require("fs");
const csv = require("csvtojson");

// console.log(csv);
const uploadUrl = "https://foodtruck-api.coderfy.com/city/bulk";
const filePath = "/Users/danlutsevich/Desktop/city_with_postal_codes.json";
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkRhbiIsImVtYWlsIjoibHVjaGV2aWNoMzFAZ21haWwuY29tIiwicGhvbmUiOm51bGwsImF2YXRhciI6IjUzNjY4ZjhkLWQ3NjgtNDc0YS05YWI2LTNlZWM5ODNlMDE4Yi5qcGciLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJyb2xlcyI6W3siaWQiOjIsIm5hbWUiOiJmb29kdHJ1Y2tfb3duZXIiLCJkZXNjcmlwdGlvbiI6ImZvb2R0cnVja19vd25lciJ9LHsiaWQiOjEsIm5hbWUiOiJhZG1pbiIsImRlc2NyaXB0aW9uIjoiYWRtaW4ifV0sImlhdCI6MTcxMzc3MDc2MywiZXhwIjoxNzEzODU3MTYzfQ.0yk9L3P4RLXPhv3ET9Ni-x1cmdw5T4-0iyh-BrvRrXI";

function splitArray(arr, chunkSize) {
  var chunks = [];
  for (var i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

const convertAndSave = async () => {
  // csv()
  // .fromFile(filePath)

  const jsonObj = JSON.parse(fs.readFileSync(filePath));

  // .then(async (jsonObj) => {
  const data = jsonObj.map((item) => {
    const keys = Object.keys(item);
    const res = {};

    keys.forEach((key) => {
      const newKey = key.toLowerCase().replace(/ /g, "_");
      newKey != "id" && (res[newKey] = item[key]);
    });

    return res;
  });

  console.log("items found: ", data?.length);

  const chunkedData = splitArray(data, 10000);

  let n = 0;
  const total = data.length / 10000;

  for (chunk of chunkedData) {
    n++;
    console.log(`${n} / ${total}`);

    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        bulk: chunk,
      }),
    });

    console.log(res.status);
  }

  console.log("\n\ndone");

  //   fs.writeFileSync(
  //     "/Users/danlutsevich/Desktop/allCountriesJSON2.json",
  //     JSON.stringify(data, null, 2)
  //   );
  // });
};

convertAndSave();
// const data = fs.readFileSync("/Users/danlutsevich/Desktop/allCountriesCSV.csv");

// const data = process;

// console.log(JSON.parse(data.toString()));
