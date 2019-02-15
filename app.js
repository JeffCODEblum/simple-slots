const PORT = 3000;
const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const request = require("request");
const fs = require("fs");
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));

app.listen(8080, () => {
  console.log(`server listening on port 8080`);
});

var holdings = 0;
var payoutThreshold = 10;
var runningPayoutTotal = 0;

app.get("/data", function(req, res) {
  res.send({
    holdings: holdings,
    runningPayoutTotal: runningPayoutTotal
  });
});

app.get("/play", function(req, res) {
  holdings++;
  var winner = false;
  var jackpot = 0;
  if (holdings >= payoutThreshold) {
    winner = Math.floor(Math.random() * 4) == 3; // 25% chance of winning
    jackpot = (Math.floor(Math.random() * 40) + 10) * 0.01 * holdings;
    holdings -= jackpot;
    runningPayoutTotal += jackpot;
  }
  res.send({
    jackpot: jackpot
  });
});

// this will be used to set the slot prices
// function Poll() {
//   request.get(
//     "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=ORD4XILRUPZNROE7",
//     function(error, response, body) {
//       if (error) console.log(error);
//       if (body) {
//         var parsed = JSON.parse(body);
//       }
//     }
//   );
// 500 times per day, max allowed by api
//setTimeout(Poll, (1000 * 60 * 60 * 24) / 500);
//}
