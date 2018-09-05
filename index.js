let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/timestamp/:dateString?", (req, res) => {
  let dateString = req.params.dateString;
  let date = dateString ? new Date(dateString) : new Date();
  let unix = date.getTime();
  let utc = date.toUTCString();
  if (unix) res.json({
    unix: unix,
    utc: utc
  })
  else res.json({error: utc});
})

app.get("/api/header", (req, res) => {
  let ip = req.get('x-forwarded-for') || req.connection.remoteAddress;
  let lang = req.get("accept-language");
  let sys = req.get("user-agent");
  res.json({
    ipaddress: ip,
    language: lang,
    software: sys
  });
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening...");
})
