/**
 * Get the appropriate emoji/icon for a guild based on its features
 * @param {Guild} guild - Discord.js Guild object
 * @returns {string|null} URL to the appropriate emoji or null
 */
function getServerIcon(guild) {
  const verified = guild.verified;
  const community = guild.features.includes("COMMUNITY");
  const discoverable = guild.features.includes("DISCOVERABLE");
  const boostCount = guild.premiumSubscriptionCount;
  const boostLevel = guild.premiumTier;

  if (verified) {
    return "https://cdn3.emoji.gg/emojis/1178-verified.png";
  }
  if (community) {
    if (discoverable) {
      if (boostCount > 0) {
        return "https://cdn3.emoji.gg/emojis/4118-community-server-boosted-public.png";
      } else {
        return "https://cdn3.emoji.gg/emojis/5006-community-server-w.png";
      }
    } else {
      if (boostCount > 0) {
        return "https://cdn3.emoji.gg/emojis/3388-community-server-boosted.png";
      } else {
        return "https://cdn3.emoji.gg/emojis/4118-community-server-w.png";
      }
    }
  } else {
    if (boostLevel === 1) {
      return "https://cdn3.emoji.gg/emojis/73190-1-level-boost.png";
    }
    if (boostLevel === 2) {
      return "https://cdn3.emoji.gg/emojis/18822-2-level-boost.png";
    }
    if (boostLevel === 3) {
      return "https://cdn3.emoji.gg/emojis/62148-3-level-boost.png";
    }
  }
  return null;
}

function base64Icon(iconURL) {
  return new Promise((resolve, reject) => {
    if (!iconURL) {
      resolve(null);
      return;
    }
    fetch(iconURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        // Converter arrayBuffer para Buffer do Node.js
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        resolve(`data:image/png;base64,${base64}`);
      })
      .catch((error) => {
        console.error("Error fetching icon:", error);
        resolve(null);
      });
  });
}

module.exports = {
  getServerIcon,
  base64Icon,
};
