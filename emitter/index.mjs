import ZwiftLogMonitor from "zwift-log-monitor";

let zlm = new ZwiftLogMonitor({
  // log: console.log,
});

zlm.on("ready", () => {
  let messages = zlm.getAllChat();
  // console.log(messages);

  // let version = zlm.getGameVersion();
  // let world = zlm.getWorld();
  // let playerId = zlm.getPlayerid();
  // let steeringMode = zlm.getSteeringMode();
  // let sport = zlm.getSport();

  zlm.start();
});

zlm.on("chat", async (chat) => {
  await sendData(chat);
  console.log("POST request sent successfully");
});

setInterval(() => {
  sendData("test message");
}, 10000);

async function sendData(chat) {
  // Send the quote as a POST request
  return  await fetch(
    "http://127.0.0.1:49999/plugin?name=zwiftlog",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat: chat }),
    }
  );
}


