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

const Printer = {
  printDefault: () => {
    printClient.print(process.env.MY_PRINTER1, "print me! " + new Date(), "text/plain");
  },
  printEspecially: (callback) => {
    const filename = path.join(__dirname, "../queue/restaurants.txt");
    const data = fs.readFileSync(filename, "utf8");
    const type = mime.lookup(filename); // 'text/markdown'
    console.log(data.length, filename, type);
    printClient.print(process.env.MY_PRINTER1, data, type, new Date() + " PRINT");
    //GCPClient.prototype.print = failRetry(function (printerId, content, contentType, title, settings, cb) {
  },
  getPrinters: (callback) => {
    printClient.getPrinters().then(function (printers) {
      if (callback !== null) {
        callback(printers); //json
      }
    });
  },
  getQueuedJobs: (callback) => {
    printClient.getQueuedJobs().then(function (data) {
      callback(data);
    });
  },
};
export default Printer;
