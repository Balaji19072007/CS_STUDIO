const io = require("socket.io-client");
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"]
});
socket.on("connect", () => {
  console.log("Connected with id", socket.id);
  process.exit(0);
});
socket.on("connect_error", (err) => {
  console.log("Connect error:", err.message);
  process.exit(1);
});
setTimeout(() => {
  console.log("Timeout");
  process.exit(1);
}, 3000);
