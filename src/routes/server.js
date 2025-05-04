const express = require("express");
const { getServerIcon, base64Icon } = require("../utils/serverUtils");
const { generateServerInviteSVGWithBase64Image } = require("../image/svg");
const { generateErrorSVG } = require("../image/errorSvg");
const router = express.Router();

// Route to get server invite image with customization options
router.get("/invite/:serverId", async (req, res) => {
  try {
    const client = req.app.locals.discordClient;
    const serverId = req.params.serverId;

    // Get customization parameters from query string with defaults
    const backgroundColor = req.query.backgroundColor || "1a1c1f"; // Default dark background
    const buttonColor = req.query.buttonColor || "00863A"; // Default green button
    const buttonText = req.query.buttonText || "Join"; // Default button text
    const buttonTextColor = req.query.buttonTextColor || "ffffff"; // New parameter
    const infoColor = req.query.infoColor || "b5bac1"; // Default info text color
    const nameColor = req.query.nameColor || "ffffff"; // Default server name color (white)

    // New parameter: borderRadius (limited between 0-30)
    let borderRadius = parseInt(req.query.borderRadius);
    borderRadius = !isNaN(borderRadius)
      ? Math.min(Math.max(borderRadius, 0), 30) // Clamp between 0-30
      : 10; // Default value

    // Try to fetch the guild by ID
    const guild = await client.guilds.fetch(serverId).catch(() => null);

    // If guild not found, return error SVG instead of JSON error
    if (!guild) {
      // Create customization object for error SVG
      const customization = {
        backgroundColor: formatColor(backgroundColor),
        borderRadius: borderRadius,
        textColor: "#ffffff", // Always use white text for error
      };

      // Generate and send error SVG
      const errorSvg = generateErrorSVG(customization);
      res.setHeader("Content-Type", "image/svg+xml");
      return res.send(errorSvg);
    }

    // Fetch members to get online count
    await guild.members.fetch();
    const onlineMembers = guild.members.cache.filter(
      (member) =>
        member.presence?.status && member.presence.status !== "offline"
    ).size;

    // Convert server icon to base64 before sending to SVG generator
    const iconURL = guild.iconURL();
    const base64IconData = await base64Icon(iconURL);

    // Server data for SVG with customization options
    const serverData = {
      name: guild.name,
      iconURL: base64IconData, // Já passa o ícone em formato base64
      memberCount: guild.memberCount,
      onlineCount: onlineMembers,
      // Pass customization parameters
      customization: {
        backgroundColor: formatColor(backgroundColor),
        buttonColor: formatColor(buttonColor),
        buttonText: buttonText,
        buttonTextColor: formatColor(buttonTextColor), // Add new parameter
        infoColor: formatColor(infoColor),
        borderRadius: borderRadius,
        nameColor: formatColor(nameColor),
      },
    };

    // Generate SVG
    const svg = await generateServerInviteSVGWithBase64Image(serverData);

    // Send as image
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error("Error generating server invite image:", error);

    // Also return error SVG for exceptions instead of plain text
    const errorSvg = generateErrorSVG();
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(500).send(errorSvg);
  }
});

// Helper function to ensure colors are properly formatted with #
function formatColor(colorString) {
  if (!colorString) return "#1a1c1f"; // Default
  return colorString.startsWith("#") ? colorString : `#${colorString}`;
}

module.exports = router;
