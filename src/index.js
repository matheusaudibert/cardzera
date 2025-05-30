require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const serverRoutes = require("./routes/server");
const guildsRoutes = require("./routes/guilds");
const path = require("path");

// Discord client configuration
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences, // Added to track online status
  ],
});

// Express configuration
const app = express();
const PORT = process.env.PORT || 8000;

// Set CORS headers for API access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// // Serve favicon
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "favicon.ico"));
});

// Set client for routes to use
app.locals.discordClient = client;

// Main route
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// Server info routes
app.use("/", serverRoutes);
app.use("/", guildsRoutes);

// Initialize the bot and server
async function initialize() {
  try {
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Express server running on port ${PORT}`);
    });

    // Discord bot login
    await client.login(process.env.BOT_TOKEN);
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

// Discord events
client.once("ready", () => {
  console.log(`Bot is online! Logged in as ${client.user.tag}`);

  // Set bot status
  client.user.setPresence({
    activities: [
      {
        name: "the server <3",
        type: 3,
      },
    ],
    status: "online",
  });
});

// Start everything
initialize();
