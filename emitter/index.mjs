import ZwiftLogMonitor from "zwift-log-monitor";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

let zlm = new ZwiftLogMonitor({
  // log: console.log,
});

zlm.on("ready", () => {
  if (argv.catchup) {
    catchupChat();
    catchupWorld();
    catchupSport();
    catchupSteeringMode();
    catchupPacePartner();
    catchupPlayerId();
    catchupGameVersion();
  }

  // let version = zlm.getGameVersion();
  // let world = zlm.getWorld();
  // let playerId = zlm.getPlayerid();
  // let steeringMode = zlm.getSteeringMode();
  // let sport = zlm.getSport();

  zlm.start();
});

async function catchupChat() {
  try {
    let messages = zlm.getAllChat();
    messages.forEach(async (chat) => {
      console.log(formatChat(chat));
      await sendData({chat: formatChat(chat)});
    });
  } catch (error) {
    // console.error(error);
  }
}

async function catchupWorld() {
  try {
    let world = zlm.getWorld();
    await sendData({world: world});
  } catch (error) {
    // console.error(error);
  } 
}

async function catchupSport() {
  try {
    let sport = zlm.getSport();
    await sendData({sport: sport});
  } catch (error) {
    // console.error(error);
  } 
}

async function catchupSteeringMode() {
  try {
    let steeringMode = zlm.getSteeringMode();
    await sendData({steeringMode: steeringMode});
  } catch (error) {
    // console.error(error);
  } 
}

async function catchupPacePartner() {
  try {
    let playerId = zlm.getPacePartner();
    await sendData({pacePartner: pacePartner});
  } catch (error) {
    // console.error(error);
  } 
}

async function catchupPlayerId() {
  try {
    let playerId = zlm.getPlayerId();
    await sendData({playerId: playerId});
  } catch (error) {
    // console.error(error);
  } 
}

async function catchupGameVersion() {
  try {
    let gameVersion = zlm.getGameVersion();
    await sendData({gameVersion: gameVersion});
  } catch (error) {
    // console.error(error);
  } 
}


zlm.on("chat", async (chat) => {
  try {
    console.log(formatChat(chat));
    await sendData({chat: formatChat(chat)});
  } catch (error) {
    // console.error(error);
  }
});

zlm.on("info", async (info) => {
  console.log(info);
  try {
    await sendData({info: info});
  } catch (error) {
    // console.error(error);
  }
});

zlm.on("world", async (world) => {
  console.log(world);
  try {
    await sendData({world: world});
  } catch (error) {
    // console.error(error);
  }
});

zlm.on("sport", async (sport) => {
  console.log(sport);
  try {
    await sendData({sport: sport});
  } catch (error) {
    // console.error(error);
  }
});

zlm.on("steeringMode", async (steeringMode) => {
  console.log(steeringMode);
  try {
    await sendData({steeringMode: steeringMode});
  } catch (error) {
    // console.error(error);
  }
});

// setInterval(() => {
//   sendData("test message"  + " " + [...Array(Math.floor(Math.random() * 230) + 20)].map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('') );
// }, 5_000);

let isConnected = false;
let connectionRetries = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function sendData(data) {
  try {
    const response = await fetchWithRetry(data);
    if (!isConnected) {
      console.log('Connection restored to server');
      isConnected = true;
      connectionRetries = 0;
    }
    return response;
  } catch (error) {
    handleSendError(error, data);
    throw error;
  }
}

async function fetchWithRetry(data, attempt = 1) {
  try {
    const response = await fetch(
      "http://127.0.0.1:49999/plugin?name=zwiftlog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (attempt < MAX_RETRIES && (error.code === 'ECONNREFUSED' || error.name === 'TypeError')) {
      console.log(`Connection attempt ${attempt} failed, retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(data, attempt + 1);
    }
    throw error;
  }
}

function handleSendError(error, data) {
  if (error.code === 'ECONNREFUSED') {
    if (isConnected) {
      console.error('Lost connection to server at http://127.0.0.1:49999');
      isConnected = false;
    }
    console.error(`Failed to send data after ${MAX_RETRIES} attempts. Server may be down.`);
  } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
    console.error('Network error: Unable to reach the server');
  } else {
    console.error('Error sending data:', error.message);
  }
  
  // Log the data that failed to send
  console.debug('Failed to send data:', data);
}

function formatChat(chat) {
  return `(${chat.time}) ${chat.name || chat.user}: ${chat.message} (${chat.scope})`;
}