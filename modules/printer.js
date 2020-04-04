require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
//프린터 정보 설정
const code = process.env.CODE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const CloudPrint = require("node-gcp");
const printClient = new CloudPrint({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN,
});

const printDefault = () => {
  printClient.print(process.env.MY_PRINTER1, "print me! " + new Date(), "text/plain");
};

const printText = () => {
  const filename = path.join(__dirname, "../queue/test.pdf");
  const result = fs.readFileSync(filename, "utf8");
  console.log(result, filename);
  const type = mime.lookup(filename); // 'text/markdown'
  console.log(type);
  // printClient.print(process.env.MY_PRINTER1, data);
};

export { printDefault, printText };
