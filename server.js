const http = require("http");
const { createReadStream } = require("fs");
const fetch = require("node-fetch");

const server = http.createServer(async (req, res) => {
  const switchBotCommandURL =
    "https://api.switch-bot.com/v1.0/devices/${YOUR_DEVICE_ID}/commands";

  switch (req.url) {
    case "/":
      const stream = createReadStream("./index.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      stream.pipe(res);
      stream.on("end", () => {
        res.end();
      });

      break;
    case "/open":
      await fetch(switchBotCommandURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TOKEN,
        },
        body: JSON.stringify({
          commandType: "command",
          command: "turnOn",
        }),
      });
      res.writeHead(200);
      res.end();
      break;
    case "/close":
      await fetch(switchBotCommandURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TOKEN,
        },
        body: JSON.stringify({
          commandType: "command",
          command: "turnOff",
        }),
      });
      res.writeHead(200);
      res.end();
      break;
  }
});

server.listen(3000);
