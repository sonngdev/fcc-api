let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/api", (req, res) => {
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
