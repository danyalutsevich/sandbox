import foodtrucks from "/Users/danlutsevich/Desktop/foodtruck_user_202407031434.json";

// console.log(foodtrucks);

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkRhbiIsImVtYWlsIjoibHVjaGV2aWNoMzFAZ21haWwuY29tIiwicGhvbmUiOm51bGwsImF2YXRhciI6IjUzNjY4ZjhkLWQ3NjgtNDc0YS05YWI2LTNlZWM5ODNlMDE4Yi5qcGciLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJwcmVtaXVtRXhwaXJlc0F0IjoiMjAyNC0wNy0xN1QxMDowMDowMC4wMDBaIiwicGF5cGFsU3Vic2NyaXB0aW9uSWQiOiJJLTJEQjkzMDIyRzBESCIsInBheXBhbFBsYW5JZCI6IlAtODUzNzkzMjc4SDMxMzI4MTZNWlFZQVFBIiwic3Vic2NyaXB0aW9uU3RhdHVzIjoiQ1JFQVRFRCIsIm1ldGFkYXRhIjp7fSwiY3Jvbm9meUF1dGgiOnsic3ViIjoiYWNjXzY2NTVjZDAzMDBjNmM4MDIzNDdiMDEyMCIsInNjb3BlIjoicmVhZF93cml0ZSIsImFjY291bnRfaWQiOiJhY2NfNjY1NWNkMDMwMGM2YzgwMjM0N2IwMTIwIiwiZXhwaXJlc19pbiI6MTA3MjAsInRva2VuX3R5cGUiOiJiZWFyZXIiLCJhY2Nlc3NfdG9rZW4iOiJObnlQaGpZY2RPT1NJWjlvVFdWWWVSSXV2YUNlamZWbiIsInJlZnJlc2hfdG9rZW4iOiJtX0pIbi1Pc0RkdlV4VFhHSFYtSHNkelJYRGpURXRGQyIsImxpbmtpbmdfcHJvZmlsZSI6eyJwcm9maWxlX2lkIjoicHJvX1ppWllyMjl4UGdDUTQzb2YiLCJwcm9maWxlX25hbWUiOiJsdWNoZXZpY2gzMUBnbWFpbC5jb20iLCJwcm92aWRlcl9uYW1lIjoiZ29vZ2xlIiwicHJvdmlkZXJfc2VydmljZSI6Imdvb2dsZSJ9fSwiY3Jvbm9meUNhbGVuZGFyIjp7InByb2ZpbGVfaWQiOiJwcm9fWmlaWXIyOXhQZ0NRNDNvZiIsImNhbGVuZGFyX2lkIjoiY2FsX1ppWllyMjl4UGdDUTQzb2ZfSFE2RS1ZbkdXYzJsSi1AVWg4Rk9ldyIsInByb2ZpbGVfbmFtZSI6Imx1Y2hldmljaDMxQGdtYWlsLmNvbSIsImNhbGVuZGFyX25hbWUiOiJGb29kdHJ1Y2siLCJwcm92aWRlcl9uYW1lIjoiZ29vZ2xlIiwiY2FsZW5kYXJfZGVsZXRlZCI6ZmFsc2UsImNhbGVuZGFyX3ByaW1hcnkiOmZhbHNlLCJwZXJtaXNzaW9uX2xldmVsIjoidW5yZXN0cmljdGVkIiwiY2FsZW5kYXJfcmVhZG9ubHkiOmZhbHNlLCJjYWxlbmRhcl9hdHRhY2htZW50c19hdmFpbGFibGUiOnRydWUsImNhbGVuZGFyX2ludGVncmF0ZWRfY29uZmVyZW5jaW5nX2F2YWlsYWJsZSI6dHJ1ZX0sImNyZWF0ZWRBdCI6IjIwMjQtMDYtMDVUMTA6NDg6MzkuOTI0WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDYtMTdUMTI6Mjg6MTYuMTM2WiIsInJvbGVzIjpbeyJpZCI6MiwibmFtZSI6ImZvb2R0cnVja19vd25lciIsImRlc2NyaXB0aW9uIjoiZm9vZHRydWNrX293bmVyIn0seyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZGVzY3JpcHRpb24iOiJhZG1pbiJ9XSwiaWF0IjoxNzIwMDA3NjU3LCJleHAiOjE3MjAwOTQwNTd9.wbxBHIEGJtkEtHs2bRY3KRTVGc3rJAboFhAZ_Sn_5hI";

const trucks = foodtrucks.foodtruck_user.map((truck) => {

  return {
    name: truck.truck_name || "name",
    email: truck.truck_email || "noemail@email.com",
    phone: truck.phone_number,
    description: truck.truck_description,
    menuDescription: truck.tagline,
    avatar: truck.truck_image,
    backdrop: truck.cover_photo,
    menu: truck.pdf_menu,
    state: truck.state,
    city: truck.city,
    zip: "00000",
    instagram: truck.instagram,
    facebook: truck.facebook,
    yelp: truck.yelp,
    owner: {
      id: 37,
    },
  };
});

const res = await fetch("https://foodtruck-api.coderfy.com/foodtruck/bulk", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + jwt,
  },
  body: JSON.stringify({ bulk: trucks }),
});

// console.log(await res.text());
console.log(trucks);
console.log(trucks.length);
