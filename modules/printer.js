import session from "express-session";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const base64 = require("file-base64");
//프린터 정보 설정
const code = process.env.CODE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const CloudPrint = require("node-gcp");
export const printClientFactory = (accessToken, refreshToken) => {
  refreshToken = refreshToken != null ? refreshToken : " ";
  // console.log("CloudPrint 객체생성 시작", accessToken, "★", refreshToken);
  return new CloudPrint({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

const Printer = {
  printDefault: (printClient) => {
    printClient.print(process.env.MY_PRINTER1, "print me! " + new Date(), "text/plain");
  },
  printEspecially: (printClient) => {
    const filename = path.join(__dirname, "../queue/restaurants.txt");
    const data = fs.readFileSync(filename, "utf8");
    const type = mime.lookup(filename); // 'text/markdown'
    console.log(data.length, filename, type);
    printClient.print(process.env.MY_PRINTER1, data, type, new Date() + " PRINT");
    //GCPClient.prototype.print = failRetry(function (printerId, content, contentType, title, settings, cb) {
  },
  print: async (printClient) => {
    const filename = path.join(__dirname, "../queue/test.pdf");
    const data = fs.readFileSync(filename, "utf-8");
    const type = mime.lookup(filename); // 'text/markdown'
    console.log(data.length, filename, type);
    printClient.print(
      process.env.MY_PRINTER1,
      "http://www.africau.edu/images/default/sample.pdf",
      "application/pdf",
      new Date() + " PRINT"
    );
    // base64.encode(filename, function (err, base64String) {
    // console.log(base64String);
    // console.log("인쇄 시작 ");
    // });
  },
  getPrinters: (printClient, callback) => {
    printClient.getPrinters().then(function (printers) {
      if (callback !== null) {
        callback(printers); //json
      }
    });
  },
  getQueuedJobs: (printClient, callback) => {
    printClient.getQueuedJobs().then(function (data) {
      callback(data);
    });
  },
};
export default Printer;
