// routes/cardzera.js
const express = require("express");
const sharp = require("sharp");

const { base64Icon } = require("../utils/serverUtils");
const { generateServerInviteSVGWithBase64Image } = require("../image/svg");
const { generateErrorSVG } = require("../image/errorSvg");

const router = express.Router();

router.use(express.static("public"));

/**
 * Helpers
 */
function formatColor(colorString) {
  if (!colorString) return "#1a1c1f";
  return colorString.startsWith("#") ? colorString : `#${colorString}`;
}

function readCustomizationFromQuery(query) {
  const backgroundColor = query.backgroundColor || "1a1c1f";
  const buttonColor = query.buttonColor || "00863A";
  const buttonText = query.buttonText || "Join";
  const buttonTextColor = query.buttonTextColor || "ffffff";
  const infoColor = query.infoColor || "b5bac1";
  const nameColor = query.nameColor || "ffffff";

  let borderRadius = parseInt(query.borderRadius, 10);
  borderRadius = !isNaN(borderRadius) ? Math.min(Math.max(borderRadius, 0), 20) : 10;

  let buttonBorderRadius = parseInt(query.buttonBorderRadius, 10);
  buttonBorderRadius = !isNaN(buttonBorderRadius)
    ? Math.min(Math.max(buttonBorderRadius, 0), 20)
    : 10;

  let titleLen = parseInt(query.titleLen, 10);
  if (isNaN(titleLen) || titleLen < 1) titleLen = 26;
  if (titleLen > 26) titleLen = 26;

  let elipsis = true;
  if (typeof query.elipsis === "string") {
    elipsis = query.elipsis === "true";
  }

  return {
    backgroundColor: formatColor(backgroundColor),
    buttonColor: formatColor(buttonColor),
    buttonText,
    buttonTextColor: formatColor(buttonTextColor),
    infoColor: formatColor(infoColor),
    nameColor: formatColor(nameColor),
    borderRadius,
    buttonBorderRadius,
    titleLen,
    elipsis,
  };
}

async function buildServerData(req) {
  const client = req.app.locals.discordClient;
  const serverId = req.params.serverId;

  const customization = readCustomizationFromQuery(req.query);

  const guild = await client.guilds.fetch(serverId).catch(() => null);
  if (!guild) {
    return { guild: null, customization };
  }

  await guild.members.fetch();

  const onlineMembers = guild.members.cache
    .filter((member) => ["online", "idle", "dnd"].includes(member.presence?.status))
    .size;

  let iconURL = guild.iconURL();
  if (!iconURL) iconURL = "https://cdn3.emoji.gg/emojis/9738-discord-ico.png";

  const base64IconData = await base64Icon(iconURL);

  const serverData = {
    name: guild.name,
    iconURL: base64IconData,
    memberCount: guild.memberCount.toLocaleString("en-US"),
    onlineCount: onlineMembers.toLocaleString("en-US"),
    customization: {
      backgroundColor: customization.backgroundColor,
      buttonColor: customization.buttonColor,
      buttonText: customization.buttonText,
      buttonTextColor: customization.buttonTextColor,
      infoColor: customization.infoColor,
      borderRadius: customization.borderRadius,
      nameColor: customization.nameColor,
      buttonBorderRadius: customization.buttonBorderRadius,
      titleLen: customization.titleLen,
      elipsis: customization.elipsis,
    },
  };

  return { guild, serverData, customization };
}

/**
 * PNG
 * Ex.: /api/1454345286854901805.png?t=123
 */
router.get("/api/:serverId.png", async (req, res) => {
  try {
    const { guild, serverData, customization } = await buildServerData(req);

    if (!guild) {
      const errorSvg = generateErrorSVG({
        backgroundColor: customization.backgroundColor,
        borderRadius: customization.borderRadius,
        textColor: "#ffffff",
      });

      const png = await sharp(Buffer.from(errorSvg)).png().toBuffer();

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "no-store");
      return res.status(404).send(png);
    }

    const svg = await generateServerInviteSVGWithBase64Image(serverData);
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    res.send(png);
  } catch (error) {
    console.error("Error generating PNG:", error);

    const errorSvg = generateErrorSVG();
    const png = await sharp(Buffer.from(errorSvg)).png().toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    res.status(500).send(png);
  }
});

/**
 * SVG
 * Ex.: /api/1454345286854901805?t=123
 */
router.get("/api/:serverId", async (req, res) => {
  try {
    const { guild, serverData, customization } = await buildServerData(req);

    if (!guild) {
      const errorSvg = generateErrorSVG({
        backgroundColor: customization.backgroundColor,
        borderRadius: customization.borderRadius,
        textColor: "#ffffff",
      });

      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
      return res.status(404).send(errorSvg);
    }

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

module.exports = router;