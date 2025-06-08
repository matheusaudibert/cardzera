const express = require("express");
const { base64Icon } = require("../utils/serverUtils");
const { generateServerInviteSVGWithBase64Image } = require("../image/svg");
const { generateErrorSVG } = require("../image/errorSvg");
const { on } = require("ws");
const router = express.Router();

// Configurar pasta de arquivos estáticos
router.use(express.static("public"));

// Route to get server invite image with customization options
router.get("/api/:serverId", async (req, res) => {
  try {
    const client = req.app.locals.discordClient;
    const serverId = req.params.serverId;

    // Get customization parameters from query string with defaults
    const backgroundColor = req.query.backgroundColor || "1a1c1f"; // Default dark background
    const buttonColor = req.query.buttonColor || "00863A"; // Default green button
    const buttonText = req.query.buttonText || "Join"; // Default button text
    const buttonTextColor = req.query.buttonTextColor || "ffffff"; // New parameter
    const infoColor = req.query.infoColor || "b5bac1"; // Default info text color
    const nameColor = req.query.nameColor || "ffffff";

    let borderRadius = parseInt(req.query.borderRadius);
    borderRadius = !isNaN(borderRadius)
      ? Math.min(Math.max(borderRadius, 0), 30) // Clamp between 0-30
      : 10; // Default value

    const guild = await client.guilds.fetch(serverId).catch(() => null);

    if (!guild) {
      const customization = {
        backgroundColor: formatColor(backgroundColor),
        borderRadius: borderRadius,
        textColor: "#ffffff",
      };

      const errorSvg = generateErrorSVG(customization);
      res.setHeader("Content-Type", "image/svg+xml");
      return res.send(errorSvg);
    }

    await guild.members.fetch();

    const onlineMembers = guild.members.cache
      .filter((member) =>
        ["online", "idle", "dnd"].includes(member.presence?.status)
      )
      .size.toLocaleString("en-US");

    let iconURL = guild.iconURL();
    if (!iconURL) iconURL = "https://cdn3.emoji.gg/emojis/9738-discord-ico.png";
    const base64IconData = await base64Icon(iconURL);

    const serverData = {
      name: guild.name,
      iconURL: base64IconData,
      memberCount: guild.memberCount.toLocaleString("en-US"),
      onlineCount: onlineMembers.toLocaleString("en-US"),
      customization: {
        backgroundColor: formatColor(backgroundColor),
        buttonColor: formatColor(buttonColor),
        buttonText: buttonText,
        buttonTextColor: formatColor(buttonTextColor),
        infoColor: formatColor(infoColor),
        borderRadius: borderRadius,
        nameColor: formatColor(nameColor),
      },
    };

    const svg = await generateServerInviteSVGWithBase64Image(serverData);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    res.send(svg);
  } catch (error) {
    console.error("Error generating server invite image:", error);

    const errorSvg = generateErrorSVG();

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    res.status(500).send(errorSvg);
  }
});

function formatColor(colorString) {
  if (!colorString) return "#1a1c1f";
  return colorString.startsWith("#") ? colorString : `#${colorString}`;
}

module.exports = router;
